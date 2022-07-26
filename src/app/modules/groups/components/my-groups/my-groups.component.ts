import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupModel } from '../../models/group.model';
import { IInviteUserEmit } from '../../interfaces/invite-user-emit.interface';
import { IActionWithUserGroupEmit } from '../../interfaces/action-with-user-group-emit.interface';
import { IGroupWhereIMember } from '../../interfaces/group-where-i-member.interface';

@Component({
  selector: 'ad-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyGroupsComponent implements OnInit {

  @Output() public inviteUser: EventEmitter<IInviteUserEmit> = new EventEmitter<IInviteUserEmit>();
  @Output() public actionWithGroupUser: EventEmitter<IActionWithUserGroupEmit> = new EventEmitter<IActionWithUserGroupEmit>();
  @Output() public deleteGroup: EventEmitter<string> = new EventEmitter<string>();

  @Input() public groups: GroupModel[] = [];
  @Input() public groupsWhereIMember: IGroupWhereIMember[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
