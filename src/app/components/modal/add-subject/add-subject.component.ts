import { addSubject } from './../../../_store/subjects/subjects.actions';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: [],
})
export class AddSubjectComponent {
  addForm = new FormGroup({
    semester: new FormControl(1, [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

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
