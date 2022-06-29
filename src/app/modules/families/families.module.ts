import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdKitModule } from 'ad-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { InviteToFamilyComponent } from './components/invite-to-family/invite-to-family.component';
import { CreateFamilyComponent } from './components/create-family/create-family.component';
import { FamiliesComponent } from './components/families/families.component';


@NgModule({
  declarations: [
    FamiliesComponent,
    InviteToFamilyComponent,
    CreateFamilyComponent
  ],
  imports: [
    CommonModule,
    AdKitModule,
    ReactiveFormsModule
  ]
})
export class FamiliesModule {
}
