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
import { ERoutes } from './shared/enum/routes.enum';
import { FamiliesComponent } from './modules/families/components/families/families.component';

const routes: Routes = [
  {
    path: '', component: IndexPageComponent, children: [
      {
        path: ERoutes.AUTH, component: AuthComponent, children: [
          {
            path: ERoutes.LOGIN, component: LoginComponent,
          },
          {
            path: ERoutes.REGISTER, component: RegisterComponent
          }
        ],
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: ERoutes.CABINET, component: CabinetComponent, canActivate: [AfterAuthGuard], children: [
      {
        path: ERoutes.PROFILE, component: ProfileComponent,
      },
      {
        path: ERoutes.TASKS, component: TasksComponent
      },
      {
        path: ERoutes.FAMILY, component: FamiliesComponent
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
