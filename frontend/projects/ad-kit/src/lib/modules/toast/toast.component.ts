import { Component, Inject, OnInit } from '@angular/core';
import { TOAST_DATA, ToastData } from './toast-config';

@Component({
  selector: 'ui-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(@Inject(TOAST_DATA) public readonly data: ToastData) {
  }

  ngOnInit(): void {
  }

}
