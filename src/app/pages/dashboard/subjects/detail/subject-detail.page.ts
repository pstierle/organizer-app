import { ExcerciseSheetService } from './../../../../_services/exercise-sheet.service';
import { IExerciseSheet } from './../../../../_models/IExerciseSheet';
import { AuthService } from 'src/app/_services/auth.service';
import {
  DeleteSubjectComponent,
  DeleteSubjectModalData,
} from './../../../../components/modal/delete-subject/delete-subject.component';
import { updateSubject } from './../../../../_store/subjects/subjects.actions';
import { Store } from '@ngrx/store';
import {
  SubjectService,
  SubjectWithExerciseSheet,
} from './../../../../_services/subjects.service';
import { takeUntil, switchMap, Observable, delay } from 'rxjs';
import { BaseComponent } from './../../../../_utils/base.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.page.html',
  styleUrls: [],
})
export class SubjectDetailPage
  extends BaseComponent
  implements OnInit, OnDestroy
{
  subject?: SubjectWithExerciseSheet;
  nameModel!: string;
  pencilIcon = faPenToSquare;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private store: Store,
    private modalService: ModalService,
    private authService: AuthService,
    private excerciseSheetService: ExcerciseSheetService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((paramMap: any, index: number) => {
          this.subject = undefined;
          const id = paramMap.get('id');
          if (!id) return new Observable();
          return this.subjectService.fetchSubjectById(id);
        }),
        delay(500)
      )
      .subscribe((subject) => {
        this.subject = subject as SubjectWithExerciseSheet;
        this.nameModel = this.subject?.name;
      });
  }

  handleBlur() {
    if (this.subject?.name !== this.nameModel && this.subject) {
      const updated = {
        ...this.subject,
        name: this.nameModel,
      };
      this.subject = updated;
      this.store.dispatch(
        updateSubject({
          subjectId: updated.id,
          data: {
            name: updated.name,
          },
        })
      );
    }
  }

  handleOpenDeleteSubjectModal() {
    if (!this.subject) return;
    this.modalService.open<DeleteSubjectComponent, DeleteSubjectModalData>(
      DeleteSubjectComponent,
      {
        position: 'center',
        panelClass: '',
        data: {
          subjectId: this.subject.id,
        },
      }
    );
  }

  handleDeleteSheet(id: string) {
    this.excerciseSheetService
      .deleteExcerciseSheet(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sheet) => {
        if (!this.subject) return;
        this.subject.excercise_sheets = this.subject.excercise_sheets.filter(
          (s) => s.id !== id
        );
      });
  }

  handleAddExcerciseSheet(sheetNumber: number) {
    if (!this.subject) return;

    const newSheet = this.authService.injectUserId<IExerciseSheet>({
      number: sheetNumber,
      subject_id: this.subject.id,
    });

    this.excerciseSheetService
      .addExcerciseSheet(newSheet)
      .pipe(takeUntil(this.destroy$))
      .subscribe((sheet) => {
        this.subject?.excercise_sheets.push(sheet);
      });
  }

  get randomArray() {
    return Array.from(Array(10).keys());
  }
}
