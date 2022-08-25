import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: [],
})
export class NoticeComponent {
  @Input() note!: string;

  hovered = false;
}
