import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, startWith, switchMap } from 'rxjs';
import { TasksModel } from '../../models/tasks.model';
import { EState } from '../../../../shared/enum/state.enum';
import { IModelWithState } from '../../../../shared/interfaces/model-with-state.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'ad-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit {

  public reloadTasks$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public tasks$: Observable<IModelWithState<TasksModel>>;

  constructor(
    private tasksService: TasksService) {
  }

  public ngOnInit(): void {
    this.initModel()
  }

  private initModel(): void {
    this.tasks$ = this.reloadTasks$.pipe(
      switchMap(() => this.tasksService.getTasksList()),
      map((model: TasksModel) => {
        this.loader$.next(false);
        return { state: EState.READY, data: model }
      }),
      startWith({ state: EState.LOADING })
    )
  }


  public createTask(title: string): void {
    this.loader$.next(true)
    this.tasksService.createTask(title).subscribe(
      () => {
        this.reloadTasks$.next(null)
      }
    )
  }
}
