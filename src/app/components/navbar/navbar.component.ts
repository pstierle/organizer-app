import { BaseComponent } from './../../_utils/base.component';
import { IUser } from './../../_models/IUser';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  faArrowRightFromBracket = faArrowRightFromBracket;
  logo = faBlog;
  user$?: Observable<IUser | undefined>;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser$();
  }

  async handleLogout() {
    await this.authService.signOut();
  }
}
