import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdKitModule } from 'ad-kit';


@NgModule({
  declarations: [
    TasksListComponent,
    TaskComponent,
    CreateTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdKitModule
  ],
})
export class TasksModule {
}
