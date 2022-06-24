import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { from, map, Observable, of, pluck, startWith, switchMap } from 'rxjs';
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

  constructor(
    private dataBdService: DataBdService
  ) {
  }

  public ngOnInit() {
    let tasksListModel: TasksListModel = new TasksListModel();
    this.tasks$ = of(tasksListModel).pipe(
      switchMap(() => from(this.dataBdService.getData('todos', 'title,isCompleted', 'user_id'))),
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
