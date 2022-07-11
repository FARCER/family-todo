import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label: string = '';
  @Input() public type: string = 'text';

  @HostBinding('class.is-error')
  get hasError(): boolean {
    return this.requiredError || this.emailField || this.itselfEmail
  }

  @Input() public requiredError: boolean = false;
  @Input() public emailField: boolean = false;
  @Input() public itselfEmail: boolean = false;

  public value: string = '';

  private onChange: (value: string) => void;
  private onTouched: () => void;

  public inputChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.onChange(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public writeValue(value: string): void {
    this.value = value;
  }
}
