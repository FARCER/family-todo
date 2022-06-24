import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from } from 'rxjs';
import { DataBdService } from '../../../../shared/services/data-bd.service';
import { UserBdService } from '../../../../shared/services/user-bd.service';

@Component({
  selector: 'ad-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  public form: FormGroup;

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
      title: new FormControl('')
    })
  }

  public submit(): void {
    console.log(this.form.value)
    const data = {
      title: this.form.value.title,
      user_id: this.userBdService.user?.id
    }
    from(this.dataBdService.updateData(data, 'todos')).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
