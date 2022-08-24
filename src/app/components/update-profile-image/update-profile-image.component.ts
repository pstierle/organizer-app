import { NotificationService } from './../../_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile-image',
  templateUrl: './update-profile-image.component.html',
  styleUrls: [],
})
export class UpdateProfileImageComponent implements OnInit {
  selectedImage: File | null = null;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  async handleUpdateImage() {
    if (this.selectedImage) {
      await this.authService.updateProfileImage(this.selectedImage);

      this.notificationService.send({
        type: 'success',
        message: 'Profilbild erfolgreich geändert',
      });
    }
  }
}
