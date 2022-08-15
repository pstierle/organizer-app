import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [],
})
export class ButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() highlight: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';

  spinnerIcon = faSpinner;

  handleClick(): void {
    this.click.emit();
  }
}
