import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'organizer';
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.authChanges((e) => {
      console.log(e)
    })
  }
}
