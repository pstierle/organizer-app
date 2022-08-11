import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: [],
})
export class DashboardPage implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}
}
