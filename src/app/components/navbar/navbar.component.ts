import { IUser } from './../../_models/IUser';
import { Subscription } from 'rxjs';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  faArrowRightFromBracket = faArrowRightFromBracket;
  logo = faBlog;
  subscription: Subscription | null = null;
  user: IUser | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.getUser$().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async handleLogout() {
    await this.authService.signOut();
  }
}
