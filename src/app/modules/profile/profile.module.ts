import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { AdKitModule } from 'ad-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthDataFormComponent } from './components/auth-data-form/auth-data-form.component';
import { PersonalDataFormComponent } from './components/persondal-data-form/personal-data-form.component';
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './store/profile.effects';


@NgModule({
  declarations: [
    ProfileComponent,
    PersonalDataFormComponent,
    AuthDataFormComponent
  ],
  imports: [
    CommonModule,
    AdKitModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ProfileEffects]),
    StoreModule.forFeature('profile', profileReducer)
  ]
})
export class ProfileModule {
}
