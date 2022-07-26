import { Injectable } from '@angular/core';
import { EBdTables } from '../../../shared/enum/bd-tables.enum';
import { EFilterType } from '../../../shared/enum/filter-type.enum';
import { DataBdService } from '../../../shared/services/bd/data-bd.service';
import { map, Observable } from 'rxjs';
import { TasksModel } from '../models/tasks.model';
import { ITask } from '../interfaces/task.interface';
import { TasksListModel } from '../models/tasks-list.model';
import { UserBdService } from '../../../shared/services/bd/user-bd.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private dataBdService: DataBdService,
    private userBdService: UserBdService
  ) {
  }

  public getTasksList(): Observable<TasksModel> {
    return this.dataBdService.getData({
      table: EBdTables.TODOS,
      columns: 'title, isCompleted, userId',
      filterField: 'userId',
      filterType: EFilterType.ID
    }).pipe(
      map((res: any) => {
        const model = new TasksModel();
        let tasks: ITask[] = res.data;
        model.tasksList = new TasksListModel();
        if (tasks.length) {
          model.tasksList.tasks = tasks
        }
        return model;
      })
    )
  }

  public createTask(title: string): Observable<any> {
    const data = {
      title,
      userId: this.userBdService.user?.id
    }
    return this.dataBdService.upsertData(data, EBdTables.TODOS)
  }
}
