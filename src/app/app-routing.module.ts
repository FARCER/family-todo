import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { IndexPageComponent } from './modules/index-page/index-page/index-page.component';
import { CabinetComponent } from './modules/cabinet/components/cabinet/cabinet.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { AfterAuthGuard } from './shared/guards/after-auth.guard';
import { TasksComponent } from './modules/tasks/components/tasks/tasks.component';

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
  // {
  //   path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard]
  // },
  {
    path: 'cabinet', component: CabinetComponent, canActivate: [AfterAuthGuard], children: [
      {
        path: 'profile', component: ProfileComponent,
      },
      {
        path: 'tasks', component: TasksComponent
      }
    ]
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
