import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { BehaviorSubject, combineLatest, map, Observable, of, pluck, switchMap } from 'rxjs';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { IGroup } from '../../interfaces/group.interface';

@Component({
  selector: 'ad-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {

  @Input() public model: GroupModel;

  public model$: Observable<GroupModel>;
  private reloadGroup: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private isNeedReload: boolean;

  constructor(
    private dataBdService: DataBdService
  ) {
  }

  ngOnInit(): void {
    this.initModel();
  }

  private initModel(): void {
    this.model$ = of(this.model).pipe(
      switchMap((model: GroupModel) => combineLatest([this.reloadGroup]).pipe(
        switchMap(() => this.isNeedReload ? this.updateGroupData(model.id) : of(model)),
        map((actualModel: GroupModel) => {
          return actualModel
        })
      ))
    );
  }

  private updateGroupData(groupId: string): Observable<GroupModel> {
    return this.dataBdService.getOneData(
      {
        table: EBdTables.GROUPS,
        columns: 'id, name, users:id(email, status, name)',
        filterField: 'id',
        customFilterField: groupId,
      }
    ).pipe(
      pluck('data'),
      map((res: IGroup) => {
        this.isNeedReload = false;
        return new GroupModel(res);
      })
    )
  }

  public updateGroup(): void {
    this.isNeedReload = true
    this.reloadGroup.next(null);
  }
}
