import { StateModel } from '../../../shared/models/state.model';
import { ITask } from '../interfaces/task.interface';

export class TasksListModel extends StateModel {

  private _tasks: ITask[];

  constructor() {
    super();
  }

  public get tasks(): ITask[] {
    return this._tasks;
  }

  public set tasks(tasks: ITask[]) {
    this._tasks = tasks;
  }
}
