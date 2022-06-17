import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { ProfileGuard } from './modules/profile/profile.guard';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
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
