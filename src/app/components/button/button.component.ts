import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [],
})
export class ButtonComponent {
  @Output() click = new EventEmitter<void>();
  @Input() loading: boolean = false;
  @Input() loadAnimation: boolean = false;
  @Input() disabled: boolean = false;
  @Input() style: 'danger' | 'success' | 'primary' | 'warning' | '' = '';
  @Input() type: string = 'button';

  spinnerIcon = faSpinner;

  handleClick(): void {
    this.click.emit();
  }

  get isDanger() {
    return this.style === 'danger';
  }

  get isWarning() {
    return this.style === 'warning';
  }

  get isSuccess() {
    return this.style === 'success';
  }

  get isPrimary() {
    return this.style === 'primary';
  }
}
