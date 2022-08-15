import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: [],
})
export class ProfileImageComponent implements OnInit, OnDestroy {
  subscription: Subscription | null = null;
  profileImage: any = null;

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .getProfileImage$()
      .subscribe((image) => {
        if (!image) return;
        var url = window.URL.createObjectURL(image);
        this.profileImage = this.sanitizer.bypassSecurityTrustUrl(url);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get userInitials() {
    return 'P';
  }
}
