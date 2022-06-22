import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { FormControl, FormGroup } from '@angular/forms';
import { from, pluck } from 'rxjs';
import { IProfile } from '../interfaces/profile.interface';
import { Router } from '@angular/router';
import { ToastService } from 'ad-kit';

@Component({
  selector: 'ad-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public form: FormGroup;
  public profile: IProfile;


  constructor(
    private readonly supabaseService: SupabaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private toastService: ToastService
  ) {
    console.log(this.supabaseService.session)

  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    from(this.supabaseService.profile).pipe(
      pluck('data')
    ).subscribe(
      (res: IProfile) => {
        this.initForm(res);
        this.profile = res;
        console.log(res)
        this.changeDetectorRef.detectChanges();
      }
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
