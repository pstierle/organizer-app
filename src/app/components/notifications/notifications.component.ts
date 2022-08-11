import { INotification } from './../../_models/INotification';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: INotification[] = [
    /*     {type: "error", header: "header", message: "Zu wenigeg poas+das"},
    {type: "warning", header: "header", message: "Zu wenigeg poas+das"},
    {type: "success", header: "header", message: "Zu wenigeg poas+das"} */
  ];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe((n) => {
      this.notifications = n;
    });
  }
}
