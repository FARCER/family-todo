import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { ProfileGuard } from './modules/profile/profile.guard';
import { IndexPageComponent } from './modules/index-page/index-page/index-page.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { TasksGuard } from './modules/tasks/tasks.guard';
import { TasksListComponent } from './modules/tasks/components/tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: '', component: IndexPageComponent
  },
  {
    path: 'auth', component: AuthComponent, children: [
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'register', component: RegisterComponent
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
  },
  {
    path: 'tasks', component: TasksListComponent, canActivate: [TasksGuard]
  },
  {
    path: '**', component: IndexPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
