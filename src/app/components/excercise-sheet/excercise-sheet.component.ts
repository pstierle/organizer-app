import {
  FileViewerComponent,
  FileViewerModalData,
} from './../modal/file-viewer/file-viewer.component';
import { ModalService } from 'src/app/_services/modal.service';
import { takeUntil } from 'rxjs';
import { BaseComponent } from './../../_utils/base.component';
import { SubmissionService } from './../../_services/submission.service';
import { ISubmission, SubmissionType } from './../../_models/ISubmission';
import { IExerciseSheet } from './../../_models/IExerciseSheet';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-excercise-sheet',
  templateUrl: './excercise-sheet.component.html',
  styleUrls: [],
})
export class ExcerciseSheetComponent extends BaseComponent implements OnInit {
  @Input() sheet!: IExerciseSheet;
  @Output() removeSheet = new EventEmitter<string>();

  submissions: ISubmission[] = [];
  submisstionTypes: SubmissionType[] = ['Abgabe', 'Lösung', 'Korrektur'];
  showIcon = faEye;
  uploadIcon = faFileArrowUp;
  downloadIcon = faFileArrowDown;
  countByType = {
    Abgabe: 0,
    Lösung: 0,
    Korrektur: 0,
  };

  trashIcon = faTrashCan;

  constructor(
    private submissionService: SubmissionService,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.submissionService
      .fetchUserSubmissionsBySheet(this.sheet.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissions = submissions;
        this.submissions.forEach((s) => (this.countByType[s.type] += 1));
        console.log(this.submissions);
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
          submissions: this.submissions.filter((s) => s.type === type) ?? [],
        },
      }
    );

    this.modalService.dialogRef.event$
      .pipe(takeUntil(this.destroy$))
      .subscribe((submission) => {
        if (submission) {
          this.submissionService.deleteSubmission(submission);
          this.submissions = this.submissions.filter(
            (s) => s.id !== submission.id
          );
        }
      });
  }

  async handleUploadFileChange(file: File, type: any) {
    const submission = await this.submissionService.addSubmission(
      {
        type,
        fileType: file.type,
        exercise_sheet_id: this.sheet.id,
      },
      file
    );

    this.submissions.push(submission);
    this.countByType[submission.type] += 1;
  }

  handleOpenSubmision(id: string) {
    console.log(id);
  }
}
