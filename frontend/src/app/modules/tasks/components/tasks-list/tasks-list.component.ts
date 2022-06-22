import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../../shared/services/supabase.service';
import { from, Observable, pluck } from 'rxjs';

@Component({
  selector: 'ad-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit {


  public tasks$: Observable<any>;

  constructor(
    private supabaseService: SupabaseService
  ) {
  }

  public ngOnInit() {
    this.tasks$ = from(this.supabaseService.getData('todos', 'title,isCompleted', 'user_id')).pipe(
      pluck('data')
    )
    from(this.supabaseService.getData('todos', 'title,isCompleted', 'user_id')).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }


}
