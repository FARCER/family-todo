import { Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'ad-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() public task: ITask;

}
