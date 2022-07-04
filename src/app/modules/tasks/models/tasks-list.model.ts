import { ITask } from '../interfaces/task.interface';

export class TasksListModel {

  private _tasks: ITask[] = [];

  constructor() {
  }

  public get tasks(): ITask[] {
    return this._tasks;
  }

  public set tasks(tasks: ITask[]) {
    this._tasks = tasks;
  }
}
