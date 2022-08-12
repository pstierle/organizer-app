import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav-item',
  templateUrl: './dashboard-nav-item.component.html',
  styleUrls: [],
})
export class DashboardNavItemComponent {
  @Input() label: string = '';
  @Input() href: string = '';
  @Input() highlight: boolean = false;

  showLabel = false;

  toogleLabel(show: boolean) {
    this.showLabel = show;
  }
}
