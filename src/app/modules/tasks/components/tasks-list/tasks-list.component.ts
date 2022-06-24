import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, pluck, startWith, Subject, switchMap } from 'rxjs';
import { TasksListModel } from '../../models/tasks-list.model';
import { EState } from '../../../../shared/enum/EState';
import { ITask } from '../../interfaces/task.interface';
import { DataBdService } from '../../../../shared/services/data-bd.service';

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
    private dataBdService: DataBdService
  ) {
  }

  public ngOnInit() {
    let tasksListModel: TasksListModel = new TasksListModel();
    this.tasks$ = this.reloadList$.pipe(
      switchMap(() => from(this.dataBdService.getData('todos', 'title, isCompleted', 'user_id'))),
      pluck('data'),
      map((res: any) => {
        let tasks: ITask[] = res;
        tasksListModel.state = EState.READY;
        tasksListModel.tasks = tasks;
        return tasksListModel;
      }),
      startWith(tasksListModel)
    )
  }
}
