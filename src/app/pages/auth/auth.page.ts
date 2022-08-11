import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: []
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService){}
  ngOnInit(): void {

  }
}
