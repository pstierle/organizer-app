import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile-image',
  templateUrl: './update-profile-image.component.html',
  styleUrls: [],
})
export class UpdateProfileImageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  handleChange(evt: any) {
    const file: File | null = evt.target.files[0];
    if (file) this.authService.updateProfileImage(file);
  }
}
