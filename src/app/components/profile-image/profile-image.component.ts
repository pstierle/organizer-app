import { Subject, Subscription, takeUntil } from 'rxjs';
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
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.authService
      .getProfileImage$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((image) => {
        if (!image) {
          this.profileImage = null;
        } else {
          var url = window.URL.createObjectURL(image);
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(url);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  get userInitials() {
    return 'P';
  }
}
