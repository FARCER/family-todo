import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AdKitModule } from 'ad-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthDataFormComponent } from './components/auth-data-form/auth-data-form.component';
import { PersonalDataFormComponent } from './components/persondal-data-form/personal-data-form.component';


@NgModule({
  declarations: [
    ProfileComponent,
    PersonalDataFormComponent,
    AuthDataFormComponent
  ],
  imports: [
    CommonModule,
    AdKitModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {
}
