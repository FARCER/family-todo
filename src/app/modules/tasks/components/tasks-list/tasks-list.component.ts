import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TasksListModel } from '../../models/tasks-list.model';

@Component({
  selector: 'ad-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {
  @Input() public model: TasksListModel;

  public reloadList$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  public ngOnInit() {
  }
}
