import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ISelectOption } from 'src/app/_models/ISelectOption';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: [],
})
export class SelectComponent {
  @Input() label: string = '';

  @Input() options: ISelectOption[] = [];

  @Input() defaultValue: any = undefined;

  @Input() model: any = '';
  @Output() modelChange = new EventEmitter<any>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  constructor() {}

  doFocus() {
    this.focus.emit();
  }

  doBlur() {
    this.blur.emit();
  }
}
