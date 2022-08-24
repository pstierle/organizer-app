import { addSubmission } from './../../_store/submissions/submissions.actions';
import { Store } from '@ngrx/store';
import {
  FileViewerComponent,
  FileViewerModalData,
} from './../modal/file-viewer/file-viewer.component';
import { ModalService } from 'src/app/_services/modal.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from './../../_utils/base.component';
import { SubmissionType } from './../../_models/ISubmission';
import { IExerciseSheet } from './../../_models/IExerciseSheet';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { selectSubmissions } from 'src/app/_store/submissions/submissions.select';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-excercise-sheet',
  templateUrl: './excercise-sheet.component.html',
  styleUrls: [],
})
export class ExcerciseSheetComponent extends BaseComponent implements OnInit {
  @Input() sheet!: IExerciseSheet;
  @Input() id!: any;
  @Output() removeSheet = new EventEmitter<string>();
  @Output() addSumbission = new EventEmitter<{
    file: File;
    type: SubmissionType;
  }>();
  pencilIcon = faPenToSquare;

  submissionTypes: SubmissionType[] = ['Abgabe', 'Lösung', 'Korrektur'];
  showIcon = faEye;
  uploadIcon = faFileArrowUp;
  countByType: any = {};

  trashIcon = faTrashCan;

  constructor(private store: Store, private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select((state) => selectSubmissions(state, this.sheet.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissionTypes.forEach((type) => {
          this.countByType[type] =
            submissions.filter((s) => s.type === type).length ?? 0;
        });
      });
  }

  handleDelete() {
    this.removeSheet.emit(this.sheet.id);
  }

  handleOpenSubmission(type: SubmissionType) {
    this.modalService.open<FileViewerComponent, FileViewerModalData>(
      FileViewerComponent,
      {
        position: 'center',
        panelClass: '',
        data: {
          submissionType: type,
          sheetId: this.sheet.id,
        },
      }
    );
  }

  handleUploadFile(file: File, type: SubmissionType) {
    this.addSumbission.emit({
      type,
      file,
    });
  }
}
