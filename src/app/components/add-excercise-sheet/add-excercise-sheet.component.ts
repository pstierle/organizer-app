import { addExcerciseSheet } from './../../_store/excercise-sheets/excercise-sheets.actions';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-excercise-sheet',
  templateUrl: './add-excercise-sheet.component.html',
  styleUrls: [],
})
export class AddExcerciseSheetComponent {
  @Input() loadAnim!: boolean;
  @Input() subject_id?: string;
  open = false;
  selectedSheetNumber = 0;

  constructor(private store: Store) {}

  handleAdd() {
    this.store.dispatch(
      addExcerciseSheet({
        excerciseSheet: {
          number: this.selectedSheetNumber,
          subject_id: this.subject_id,
        },
      })
    );
    this.open = false;
  }
}
