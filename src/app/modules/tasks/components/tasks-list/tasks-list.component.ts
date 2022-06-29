import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of, pluck, switchMap, tap } from 'rxjs';
import { TasksListModel } from '../../models/tasks-list.model';
import { EState } from '../../../../shared/enum/state.enum';
import { ITask } from '../../interfaces/task.interface';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';

@Component({
  selector: 'ad-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {
  public tasks$: Observable<TasksListModel>;

  public reloadList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private dataBdService: DataBdService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public ngOnInit() {
    this.tasks$ = of(new TasksListModel()).pipe(
      switchMap((model: TasksListModel) => combineLatest([this.reloadList$]).pipe(
        tap(() => {
          model.state = EState.LOADING;
          this.changeDetectorRef.detectChanges();
        }),
        switchMap(() => this.dataBdService.getData('todos', 'title, isCompleted, user_id', 'userId')),
        pluck('data'),
        map((res: any) => {
          let tasks: ITask[] = res;
          model.state = EState.READY;
          model.tasks = tasks;
          return model;
        }),
      ))
    )
  }
}
