import { updateExcerciseSheet } from './../../_store/excercise-sheets/excercise-sheets.actions';
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
import { Component, Input, OnInit } from '@angular/core';
import {
  faCircleQuestion,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { selectSubmissions } from 'src/app/_store/submissions/submissions.select';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { deleteExcerciseSheet } from 'src/app/_store/excercise-sheets/excercise-sheets.actions';
import { selectIsLoading } from 'src/app/_store/excercise-sheets/excercise-sheets.select';

@Component({
  selector: 'app-excercise-sheet',
  templateUrl: './excercise-sheet.component.html',
  styleUrls: [],
})
export class ExcerciseSheetComponent extends BaseComponent implements OnInit {
  @Input() sheet?: IExerciseSheet;
  @Input() id!: any;
  @Input() loadAnimation: boolean = false;
  isLoading: boolean = false;

  pencilIcon = faPenToSquare;
  questionIcon = faCircleQuestion;
  submissionTypes: SubmissionType[] = ['Abgabe', 'Lösung', 'Korrektur'];
  showIcon = faEye;
  uploadIcon = faFileArrowUp;
  countByType: any = {};
  topicModel = '';

  trashIcon = faTrashCan;

  constructor(private store: Store, private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.topicModel = this.sheet?.topic ?? '';

    this.store
      .select(selectIsLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.store
      .select((state) => selectSubmissions(state, this.sheet?.id ?? ''))
      .pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissionTypes.forEach((type) => {
          this.countByType[type] =
            submissions.filter((s) => s.type === type).length ?? 0;
        });
      });
  }

  handleDelete() {
    if (!this.sheet) return;
    this.store.dispatch(
      deleteExcerciseSheet({
        id: this.sheet.id,
      })
    );
  }

  handleOpenSubmission(type: SubmissionType) {
    if (!this.sheet) return;
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
    if (!this.sheet) return;
    this.store.dispatch(
      addSubmission({
        submission: {
          type,
          fileType: file.type,
          exercise_sheet_id: this.sheet.id,
        },
        file,
      })
    );
  }

  handleBlur() {
    if (!this.sheet) return;
    if (this.sheet.topic !== this.topicModel) {
      this.store.dispatch(
        updateExcerciseSheet({
          excerciseSheetId: this.sheet.id,
          data: {
            topic: this.topicModel,
          },
        })
      );
    }
  }

  handlePublishing() {
    if (!this.sheet) return;
    this.store.dispatch(
      updateExcerciseSheet({
        excerciseSheetId: this.sheet.id,
        data: {
          ...this.sheet,
          public: !this.sheet.public,
        },
      })
    );
  }
}
