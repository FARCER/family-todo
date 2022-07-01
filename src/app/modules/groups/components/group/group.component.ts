import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GroupModel } from '../../models/group.model';

@Component({
  selector: 'ad-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupComponent implements OnInit {


  @Input() public model: GroupModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
