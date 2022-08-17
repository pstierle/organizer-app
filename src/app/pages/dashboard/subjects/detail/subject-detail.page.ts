import {
  DeleteSubjectComponent,
  DeleteSubjectModalData,
} from './../../../../components/modal/delete-subject/delete-subject.component';
import { updateSubject } from './../../../../_store/subjects/subjects.actions';
import { Store } from '@ngrx/store';
import { SubjectService } from './../../../../_services/subjects.service';
import { takeUntil, switchMap, Observable, delay } from 'rxjs';
import { BaseComponent } from './../../../../_utils/base.component';
import { ISubject } from './../../../../_models/ISubject';
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
  subject?: ISubject;
  nameModel!: string;
  pencilIcon = faPenToSquare;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private store: Store,
    private modalService: ModalService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('init');
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
        this.subject = subject as ISubject;
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
          subject: updated,
        })
      );
    }
  }

  handleDelete() {
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
}
