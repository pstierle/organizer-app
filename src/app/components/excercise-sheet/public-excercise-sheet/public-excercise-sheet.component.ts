import { SubmissionService } from './../../../_services/submission.service';
import { IUser } from './../../../_models/IUser';
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
  faHeart,
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
import { getCountByType } from 'src/app/_utils/submissions.util';

@Component({
  selector: 'app-public-excercise-sheet',
  templateUrl: './public-excercise-sheet.component.html',
  styleUrls: [],
})
export class PublicExcerciseSheetComponent
  extends BaseComponent
  implements OnInit
{
  @Input() sheet!: IExerciseSheet;
  submissions: ISubmission[] = [];
  submissionTypes: SubmissionType[] = ['Abgabe', 'Lösung', 'Korrektur'];
  showIcon = faEye;
  heartIcon = faHeart;
  countByType: any = {};
  topicModel = '';
  publisher?: IUser;

  constructor(
    private modalService: ModalService,
    private submissionService: SubmissionService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.topicModel = this.sheet?.topic ?? '';
    this.submissionService
      .fetchPublicSheetSubmissions(this.sheet.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissions = submissions;
        this.countByType = getCountByType(submissions);
      });
    this.authService
      .fetchUserById(this.sheet.user_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.publisher = user;
      });
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
          allowDelete: false,
        },
      }
    );
  }

  handleLike() {}
}
