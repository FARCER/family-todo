import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdKitModule } from 'ad-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './components/groups/groups.component';
import { InviteToGroupComponent } from './components/invite-to-group/invite-to-group.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupComponent } from './components/group/group.component';


@NgModule({
  declarations: [
    GroupsComponent,
    InviteToGroupComponent,
    CreateGroupComponent,
    GroupComponent
  ],
  imports: [
    CommonModule,
    AdKitModule,
    ReactiveFormsModule
  ]
})
export class GroupsModule {
}
