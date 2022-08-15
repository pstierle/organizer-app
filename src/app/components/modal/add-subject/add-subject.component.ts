import { NotificationService } from './../../../_services/notification.service';
import {
  selectError,
  selectCurrent,
} from './../../../_store/subjects/subjects.select';
import { addSubject } from './../../../_store/subjects/subjects.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: [],
})
export class AddSubjectComponent implements OnInit, OnDestroy {
  addForm = new FormGroup({
    semester: new FormControl(1, [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  sub: any;

  constructor(
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectCurrent).subscribe((current) => {
      if (current === 'success') {
        this.notificationService.send({
          type: 'success',
          message: 'Fach erfolgreich erstellt',
        });
      }
      if (current === 'error') {
        this.notificationService.send({
          type: 'error',
          message: 'Fach erstellen fehlgeschlagen',
          header: 'Error',
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleSubmit() {
    this.store.dispatch(
      addSubject({
        subject: {
          name: this.addForm.get('name')?.value ?? '',
          semester: this.addForm.get('semester')?.value ?? 0,
        },
      })
    );
  }
}
