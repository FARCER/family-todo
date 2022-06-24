import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from, map, Observable, of, pluck, startWith, switchMap } from 'rxjs';
import { TasksListModel } from '../../models/tasks-list.model';
import { EState } from '../../../../shared/enum/EState';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'ad-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {


  public tasks$: Observable<TasksListModel>;

  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  public ngOnInit() {
    let tasksListModel: TasksListModel = new TasksListModel();
    this.tasks$ = of(tasksListModel).pipe(
      switchMap(() => from(this.supabaseService.getData('todos', 'title,isCompleted', 'user_id'))),
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
