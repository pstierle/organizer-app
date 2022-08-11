import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  async handleLogout(){
    await this.authService.signOut();
  }
}
