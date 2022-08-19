import { SubmissionService } from './../../../_services/submission.service';
import { BaseComponent } from './../../../_utils/base.component';
import { ISubmission, SubmissionType } from './../../../_models/ISubmission';
import { Component, Inject, OnInit } from '@angular/core';
import { MODAL_DATA, ModalService } from 'src/app/_services/modal.service';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

export type FileViewerModalData = {
  submissionType: SubmissionType;
  submissions: ISubmission[];
};

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: [],
})
export class FileViewerComponent extends BaseComponent implements OnInit {
  currentIndex$ = new BehaviorSubject(0);
  selectedParsedFile: any = null;
  leftIcon = faCircleArrowLeft;
  rightIcon = faCircleArrowRight;
  selectedRawFile: any = null;

  constructor(
    @Inject(MODAL_DATA) public data: FileViewerModalData,
    private submissionService: SubmissionService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (current) => {
        const file = await this.submissionService.getFileBySubmission(
          this.data.submissions[current]
        );
        if (!file) return;
        this.selectedRawFile = file;
        var url = window.URL.createObjectURL(file);
        this.selectedParsedFile = this.sanitizer.bypassSecurityTrustUrl(url);
      });
  }

  nextSubmission() {
    let current = this.currentIndex$.getValue();

    if (current === this.data.submissions.length - 1) {
      current = 0;
    } else {
      current++;
    }

    this.currentIndex$.next(current);
  }

  prevSubmission() {
    let current = this.currentIndex$.getValue();

    if (current === 0) {
      current = this.data.submissions.length - 1;
    } else {
      current--;
    }

    this.currentIndex$.next(current);
  }

  handleDownloadSubmission() {
    const blob = new Blob([this.selectedRawFile], {
      type: this.selectedSubmission.fileType,
    });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  handleDeleteSubmission() {
    this.modalService.dialogRef.event$.next(this.selectedSubmission);
    this.data.submissions = this.data.submissions.filter(
      (s) => s.id !== this.selectedSubmission.id
    );
    this.prevSubmission();
  }

  get currentIndex() {
    return this.currentIndex$.getValue();
  }

  get selectedSubmission() {
    return this.data.submissions[this.currentIndex];
  }
}
