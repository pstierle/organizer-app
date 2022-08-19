import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-excercise-sheet',
  templateUrl: './add-excercise-sheet.component.html',
  styleUrls: [],
})
export class AddExcerciseSheetComponent {
  @Input() loadAnim!: boolean;
  @Output() add = new EventEmitter<number>();
  open = false;
  selectedSheetNumber = 0;

  handleAdd() {
    console.log('emitting');
    this.add.emit(this.selectedSheetNumber);
  }
}
