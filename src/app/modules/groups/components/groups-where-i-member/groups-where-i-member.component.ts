import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ad-groups-where-i-member',
  templateUrl: './groups-where-i-member.component.html',
  styleUrls: ['./groups-where-i-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsWhereIMemberComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
