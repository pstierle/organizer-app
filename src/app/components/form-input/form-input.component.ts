import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormInputComponent),
    },
  ],
})
export class FormInputComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() label: string = '';

  @Input() type: 'text' | 'number' | 'password' = 'text';

  @Input() input = new FormControl('');

  unsubscribe$: Subject<void> = new Subject<void>();

  focused = false;

  private onChange: any;
  private onTouched: any;

  ngOnInit(): void {
    this.input.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => {
        if (this.onChange) this.onChange(this.input.value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.input.disable();
    } else {
      this.input.enable();
    }
  }

  writeValue(obj: any): void {
    this.input.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  doInput() {
    this.focused = true;
  }

  doBlur() {
    this.focused = false;
    if (this.onTouched) this.onTouched();
  }
}
