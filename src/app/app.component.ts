import { Store } from '@ngrx/store';
import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { getUniversities } from './_store/universities/universities.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'organizer';
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUniversities());
  }
}
