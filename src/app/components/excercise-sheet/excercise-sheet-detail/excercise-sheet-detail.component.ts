import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excercise-sheet-detail',
  templateUrl: './excercise-sheet-detail.component.html',
  styleUrls: [],
})
export class ExcerciseSheetDetailComponent {
  @Input() loadAnimation!: boolean;
  @Input() sheetNumber!: number;
  @Input() countByType!: any;
}
