import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IMyInvitation } from '../../interfaces/my-invitation.interface';

@Component({
  selector: 'ad-my-invitation',
  templateUrl: './my-invitation.component.html',
  styleUrls: ['./my-invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInvitationComponent {

  @Input() public data: IMyInvitation;
  @Output() public declineInvitationEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(
  ) {
  }

  public accept(): void {

  }

  public decline(): void {
    this.declineInvitationEmit.emit(this.data.id);
  }


}
