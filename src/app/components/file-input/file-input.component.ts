import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: [],
})
export class FileInputComponent implements OnInit {
  @Input() file: File | null = null;
  @Input() showFileName: boolean = true;
  @Input() accept!: string;
  @Output() fileChange = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  handleChange(evt: any) {
    this.file = evt.target.files[0] as File;
    this.fileChange.emit(this.file);
  }

  get fileName() {
    return this.file?.name;
  }
}
