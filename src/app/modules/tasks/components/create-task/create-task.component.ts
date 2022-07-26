import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TasksModel } from '../../models/tasks.model';

@Component({
  selector: 'ad-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent implements OnInit {

  @Input() public model: TasksModel;
  @Output() private createTask: EventEmitter<string> = new EventEmitter<string>();
  public form: UntypedFormGroup;

  private isSubmitted: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new UntypedFormGroup({
      title: new FormControl<string>('', [Validators.required])
    })
  }

  public submit(): void {
    this.isSubmitted = true;
    const title: string = this.form.value.title;
    if (this.form.valid) {
      this.createTask.emit(title);
      this.form.reset();
      this.isSubmitted = false;
    }
  }

  public validateTitleField() {
    return this.isSubmitted && this.form.controls['title'].errors?.['required'];
  }

}
