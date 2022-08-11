import { INotification } from './../_models/INotification';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<INotification[]>([]);

  constructor() {}

  send(notification: INotification){
    this.notifications.next([...this.notifications.getValue(), notification]);
    setTimeout(() => {
      this.notifications.next(this.notifications.getValue().filter((n, i) => i !== 0))
    }, 5000)
  }

  getNotifications(): Observable<INotification[]>{
    return this.notifications.asObservable();
  }
}
