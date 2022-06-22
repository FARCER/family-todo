import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent {

  @Input() public label: string = '';

}
