import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spinner-icon',
  templateUrl: './spinner-icon.component.html',
  styleUrls: [],
})
export class SpinnerIconComponent {
  icon = faSpinner;
}
