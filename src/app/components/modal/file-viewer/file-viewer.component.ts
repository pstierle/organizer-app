import { Store } from '@ngrx/store';
import { SubmissionService } from './../../../_services/submission.service';
import { BaseComponent } from './../../../_utils/base.component';
import { ISubmission, SubmissionType } from './../../../_models/ISubmission';
import { Component, Inject, OnInit } from '@angular/core';
import { MODAL_DATA, ModalService } from 'src/app/_services/modal.service';
import { BehaviorSubject, delay, takeUntil, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import {
  faCircleArrowRight,
  faCircleArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import {
  selectSubmissions,
  selectSubmissionsByType,
} from 'src/app/_store/submissions/submissions.select';
import { deleteSubmission } from 'src/app/_store/submissions/submissions.actions';

export type FileViewerModalData = {
  submissionType: SubmissionType;
  sheetId: string;
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
  submissions!: ISubmission[];
  loadingFile = false;

  constructor(
    @Inject(MODAL_DATA) public data: FileViewerModalData,
    private submissionService: SubmissionService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.store
      .select((state) =>
        selectSubmissionsByType(
          state,
          this.data.sheetId,
          this.data.submissionType
        )
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((submissions) => {
        this.submissions = submissions;
        if (submissions.length === 0) this.modalService.dialogRef.close();
      });

    this.currentIndex$
      .pipe(
        takeUntil(this.destroy$),
        tap((val) => {
          this.loadingFile = true;
        }),
        delay(400)
      )
      .subscribe(async (current) => {
        this.loadingFile = true;

        const file = await this.submissionService.getFileBySubmission(
          this.submissions[current]
        );
        if (!file) return;
        this.selectedRawFile = file;
        var url = window.URL.createObjectURL(file);
        this.selectedParsedFile = this.sanitizer.bypassSecurityTrustUrl(url);
        this.loadingFile = false;
      });
  }

  nextSubmission() {
    let current = this.currentIndex$.getValue();

    if (current === this.submissions.length - 1) {
      current = 0;
    } else {
      current++;
    }

    this.currentIndex$.next(current);
  }

  prevSubmission() {
    let current = this.currentIndex$.getValue();

    if (current === 0) {
      current = this.submissions.length - 1;
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
    this.store.dispatch(deleteSubmission(this.selectedSubmission));
    this.prevSubmission();
  }

  get currentIndex() {
    return this.currentIndex$.getValue();
  }

  get selectedSubmission() {
    return this.submissions[this.currentIndex];
  }
}
