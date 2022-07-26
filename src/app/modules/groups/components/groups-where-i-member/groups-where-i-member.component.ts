import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IGroupWhereIMember } from '../../interfaces/group-where-i-member.interface';

@Component({
  selector: 'ad-groups-where-i-member',
  templateUrl: './groups-where-i-member.component.html',
  styleUrls: ['./groups-where-i-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsWhereIMemberComponent implements OnInit {

  @Input() public group: IGroupWhereIMember;

  constructor() {
  }

  ngOnInit(): void {
  }

}
