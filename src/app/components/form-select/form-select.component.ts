import { Component, Input, forwardRef, OnInit, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ISelectOption } from 'src/app/_models/ISelectOption';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormSelectComponent),
    },
  ],
})
export class FormSelectComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @Input() label: string = '';

  @Input() options: ISelectOption[] = [];

  @Input() input = new FormControl('');

  @Input() defaultValue: any = undefined;

  unsubscribe$: Subject<void> = new Subject<void>();
  subscription: Subscription | null = null;

  focused = false;

  private onChange: any;
  private onTouched: any;

  ngOnInit(): void {
    this.subscription = this.input.valueChanges
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
    this.onTouched();
  }
}
