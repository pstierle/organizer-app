import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: [],
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'password' = 'text';
  @Input() model: any = '';
  @Input() label: string = '';
  @Input() placeholder: any = '';
  focused = false;
  @Input() loadAnimation = false;
  @Output() modelChange = new EventEmitter<any>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  constructor() {}

  doFocus() {
    this.focus.emit();
    this.focused = true;
  }

  doBlur() {
    this.blur.emit();
    this.focused = false;
  }
}
