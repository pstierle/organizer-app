import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [],
})
export class ButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() highlight: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';

  handleClick(): void {
    this.click.emit();
  }
}
