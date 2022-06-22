import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from } from 'rxjs';

@Component({
  selector: 'ad-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private supabaseService: SupabaseService
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
      user_id: this.supabaseService.user?.id
    }
    from(this.supabaseService.updateData(data, 'todos')).subscribe(
      (res) => {
        console.log(res)
      }
    )
  }

}
