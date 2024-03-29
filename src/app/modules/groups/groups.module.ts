import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdKitModule } from 'ad-kit';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './components/groups/groups.component';
import { InviteToGroupComponent } from './components/invite-to-group/invite-to-group.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupComponent } from './components/group/group.component';
import { MyInvitationComponent } from './components/my-invitation/my-invitation.component';
import { SharedModule } from '../../shared/shared.module';
import { MyGroupsComponent } from './components/my-groups/my-groups.component';
import { GroupsWhereIMemberComponent } from './components/groups-where-i-member/groups-where-i-member.component';


@NgModule({
  declarations: [
    GroupsComponent,
    InviteToGroupComponent,
    CreateGroupComponent,
    GroupComponent,
    MyInvitationComponent,
    MyGroupsComponent,
    GroupsWhereIMemberComponent
  ],
  imports: [
    CommonModule,
    AdKitModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GroupsModule {
}
