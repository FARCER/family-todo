import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { IProfile } from '../../../profile/interfaces/profile.interface';
import { BehaviorSubject, combineLatest, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { FamiliesModel } from '../../models/families.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EState } from '../../../../shared/enum/state.enum';

@Component({
  selector: 'ad-family',
  templateUrl: './families.component.html',
  styleUrls: ['./families.component.scss']
})
export class FamiliesComponent implements OnInit {

  public myFamilies$: Observable<FamiliesModel>;

  private user: IProfile;
  private reloadFamilies$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private localStorageService: LocalStorageService,
    private dataBdService: DataBdService
  ) {
    this.user = JSON.parse(this.localStorageService.getItem('profile'))
  }

  ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.myFamilies$ = of(new FamiliesModel()).pipe(
      switchMap((model: FamiliesModel) => combineLatest([this.reloadFamilies$]).pipe(
        switchMap(() => forkJoin([this.dataBdService.getData('families', 'creatorName, id', 'creatorId'),
          this.dataBdService.getDataByEmail('invite-to-family', 'user_email', 'user_email')])),
        map(([res, res2]) => {
          console.log(res2)
          const myFamily: any = res.data;
          if (myFamily.length) {
            console.log(myFamily)
            model.myFamily = myFamily;
          }
          model.state = EState.READY;
          return model;
        })
      ))
    )
  }
}
