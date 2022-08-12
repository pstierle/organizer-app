import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: [],
})
export class DashboardPage implements OnInit {
  homeIcon = faHome;
  currentRoute = '/dashboard';
  navItems = [
    {
      route: '/dashboard/home',
      icon: faHome,
      label: 'Home',
    },
    {
      route: '/dashboard/settings',
      icon: faGear,
      label: 'Einstellungen',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }
}
