import { Component, Input, OnInit } from '@angular/core';
import { IFormMessage } from './form-message.interface';

@Component({
  selector: 'ui-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.scss']
})
export class FormMessageComponent implements OnInit {

  @Input() public message: IFormMessage;

  constructor() {
  }

  ngOnInit(): void {
  }

  public get classes(): string {
    return `message ${this.message.type}`;
  }

}
