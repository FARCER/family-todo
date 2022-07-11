import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IMyInvitation } from '../../interfaces/my-invitation.interface';
import { IInvitationAnswer } from '../../interfaces/invitation-answer.interface';

@Component({
  selector: 'ad-my-invitation',
  templateUrl: './my-invitation.component.html',
  styleUrls: ['./my-invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInvitationComponent {

  @Input() public data: IMyInvitation;
  @Output() public invitationResultEmit: EventEmitter<IInvitationAnswer> = new EventEmitter<IInvitationAnswer>();

  constructor(
  ) {
  }

  public answer(accept: boolean): void {
    this.invitationResultEmit.emit({
      accept,
      id: this.data.id
    });
  }


}
