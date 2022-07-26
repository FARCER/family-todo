import { TasksListModel } from './tasks-list.model';

export class TasksModel {

  private _tasksList: TasksListModel;

  public get tasksList(): TasksListModel {
    return this._tasksList;
  }

  public set tasksList(list: TasksListModel) {
    this._tasksList = list;
  }

}
