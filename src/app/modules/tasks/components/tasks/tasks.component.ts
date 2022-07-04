import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, of, pluck, switchMap } from 'rxjs';
import { TasksModel } from '../../models/tasks.model';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { EFilterType } from '../../../../shared/enum/filter-type.enum';
import { ITask } from '../../interfaces/task.interface';
import { EState } from '../../../../shared/enum/state.enum';
import { TasksListModel } from '../../models/tasks-list.model';

@Component({
  selector: 'ad-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  public reloadTasks$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public tasks$: Observable<TasksModel>;

  constructor(
    private dataBdService: DataBdService) {
  }

  public ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.tasks$ = of(new TasksModel()).pipe(
      switchMap((model: TasksModel) => combineLatest([this.reloadTasks$]).pipe(
        switchMap(() => this.dataBdService.getData({
          table: EBdTables.TODOS,
          columns: 'title, isCompleted, userId',
          filterField: 'userId',
          filterType: EFilterType.ID
        })),
        pluck('data'),
        map((res: any) => {
          let tasks: ITask[] = res;
          model.state = EState.READY;
          if (tasks.length) {
            const list: TasksListModel = new TasksListModel();
            list.tasks = tasks
            model.tasksList = list;
          }
          return model;
        })
      ))
    )
  }
}
