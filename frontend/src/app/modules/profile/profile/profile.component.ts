import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { FormControl, FormGroup } from '@angular/forms';
import { from, map, Observable, of, pluck, startWith, switchMap } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { Router } from '@angular/router';
import { ToastService } from 'ad-kit';
import { Profile } from '../models/profile.model';
import { EState } from '../../../shared/enum/EState';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public profileModel$: Observable<Profile>;

  public form: FormGroup;


  constructor(
    private readonly supabaseService: SupabaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService
  ) {
    console.log(this.supabaseService.session)

  }

  ngOnInit(): void {
    this.initProfileModel();
  }


  private initProfileModel(): void {
    let model: Profile;

    this.profileModel$ = of(new Profile()).pipe(
      switchMap((profile: Profile) => {
        console.log(profile)
        model = profile;
        return from(this.supabaseService.profile)
      }),
      pluck('data'),
      map((profile: IProfile) => {
        this.initForm(profile);
        model.state = EState.READY;
        return model;
      }),
      startWith(new Profile()),
    )
  }

  private initForm(profile: IProfile): void {
    this.form = new FormGroup({
      name: new FormControl(profile.name),
      surName: new FormControl(profile.surName),
      patronymic: new FormControl(profile.patronymic),
      dateOfBirth: new FormControl(profile.dateOfBirth),
      email: new FormControl(profile.email),
    })
  }

  public updateProfile(): void {
    const profile: IProfile = {
      name: this.form.value.name,
      surName: this.form.value.surName,
      patronymic: this.form.value.patronymic,
      dateOfBirth: this.form.value.dateOfBirth,
      email: this.form.value.email
    }
    const updateData = {
      ...profile,
      id: this.supabaseService.user?.id,
      updated_at: new Date(),
    }
    from(this.supabaseService.updateData(updateData, 'profiles')).subscribe(
      (res) => {
        console.log(res);
      }
    )

  }

  public logout(): void {
    from(this.supabaseService.logout()).subscribe(
      (res) => {
        this.router.navigate(['/auth']);
        this.toastService.show({ text: 'Вы успешно вышли из личного кабинета', type: 'success' })
      }
    )
  }

}
