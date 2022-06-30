import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';

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

  @HostBinding('class.is-done') get isDone() {
    return this.task.isCompleted;
  }

  @Input() public task: ITask;

  public toggleTask(isCompleted: boolean): void {
    this.task.isCompleted = !this.task.isCompleted;
    const updateData: any = {
      isCompleted,
      user_id: this.task.user_id,
      title: this.task.title
    }
    this.dataBdService.updateData(updateData, EBdTables.TODOS).subscribe()
  }

}
