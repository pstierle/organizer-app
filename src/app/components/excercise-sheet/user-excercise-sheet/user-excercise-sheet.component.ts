import { AuthService } from './../../../_services/auth.service';
import { ISubmission } from './../../../_models/ISubmission';
import { BaseComponent } from './../../../_utils/base.component';
import { Component, Input, OnInit } from '@angular/core';
import {
  faPenToSquare,
  faCircleQuestion,
  faEye,
  faFileArrowUp,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { IExerciseSheet } from 'src/app/_models/IExerciseSheet';
import { SubmissionType } from 'src/app/_models/ISubmission';
import { ModalService } from 'src/app/_services/modal.service';
import {
  deleteExcerciseSheet,
  updateExcerciseSheet,
} from 'src/app/_store/excercise-sheets/excercise-sheets.actions';
import { selectIsLoading } from 'src/app/_store/excercise-sheets/excercise-sheets.select';
import { addSubmission } from 'src/app/_store/submissions/submissions.actions';
import { selectSubmissions } from 'src/app/_store/submissions/submissions.select';
import {
  FileViewerComponent,
  FileViewerModalData,
} from '../../modal/file-viewer/file-viewer.component';
import {
  getCountByType,
  submissionTypesArr,
} from 'src/app/_utils/submissions.util';

@Component({
  selector: 'app-user-excercise-sheet',
  templateUrl: './user-excercise-sheet.component.html',
  styleUrls: [],
})
export class UserExcerciseSheetComponent
  extends BaseComponent
  implements OnInit
{
  @Input() sheet?: IExerciseSheet;
  @Input() loadAnimation: boolean = false;
  isLoading: boolean = false;

  pencilIcon = faPenToSquare;
  questionIcon = faCircleQuestion;
  submissions: ISubmission[] = [];
  submissionTypes: SubmissionType[] = submissionTypesArr;
  showIcon = faEye;
  uploadIcon = faFileArrowUp;
  countByType: any = {};
  topicModel = '';

  trashIcon = faTrashCan;

  constructor(private store: Store, private modalService: ModalService) {
    super();
  }

  get sheetLoadAnimation() {
    return this.isLoading || this.loadAnimation;
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
        this.submissions = submissions.filter(
          (s) => s.exercise_sheet_id === this.sheet?.id
        );
        this.countByType = getCountByType(submissions);
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
          userId: this.sheet.user_id,
          submissions: this.submissions.filter((s) => s.type === type),
          allowDelete: true,
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
          exercise_sheet_id: this.sheet?.id,
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
