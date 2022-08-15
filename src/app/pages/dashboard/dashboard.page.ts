import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: [],
})
export class DashboardPage implements OnInit, OnDestroy {
  subscription!: Subscription;
  homeIcon = faHome;
  currentRoute = '/dashboard';
  navItems = [
    {
      route: 'home',
      icon: faHome,
      label: 'Home',
    },
    {
      route: 'subjects',
      icon: faGraduationCap,
      label: 'Fächer',
    },
    {
      route: 'settings',
      icon: faGear,
      label: 'Einstellungen',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.subscription = this.router.events.subscribe((evt) => {
      if ((evt as any).url) this.currentRoute = (evt as any).url;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
