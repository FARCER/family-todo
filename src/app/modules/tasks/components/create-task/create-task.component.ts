import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBdService } from '../../../../shared/services/bd/data-bd.service';
import { UserBdService } from '../../../../shared/services/bd/user-bd.service';
import { EBdTables } from '../../../../shared/enum/bd-tables.enum';
import { TasksModel } from '../../models/tasks.model';
import { EState } from '../../../../shared/enum/state.enum';

@Component({
  selector: 'ad-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent implements OnInit {

  @Input() public model: TasksModel;
  @Output() private reloadTasksList: EventEmitter<void> = new EventEmitter<void>();
  public form: FormGroup;

  private isSubmitted: boolean = false;

  constructor(
    private dataBdService: DataBdService,
    private userBdService: UserBdService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    const data = {
      title: this.form.value.title,
      userId: this.userBdService.user?.id
    }
    if (this.form.valid) {
      this.model.state = EState.LOADING;
      this.dataBdService.updateData(data, EBdTables.TODOS).subscribe(
        (res) => {
          this.reloadTasksList.emit();
          this.form.reset();
          this.isSubmitted = false;
          console.log(res)
        }
      )
    }
  }

  public validateTitleField() {
    return this.isSubmitted && this.form.controls['title'].errors?.['required'];
  }

}
