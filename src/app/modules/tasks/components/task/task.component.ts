import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { DataBdService } from '../../../../shared/services/data-bd.service';

@Component({
  selector: 'ad-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  constructor(
    private dataBdService: DataBdService
  ) {
  }

  @Input() public task: ITask;

  public toggleTask(isCompleted: boolean): void {
    console.log(this.task);
    const updateData: any = {
      isCompleted,
      user_id: this.task.user_id,
      title: this.task.title
    }
    this.dataBdService.updateData(updateData, 'todos').subscribe()
  }

}
