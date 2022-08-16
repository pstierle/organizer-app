import { BaseComponent } from './../../../_utils/base.component';
import { Observable, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_services/modal.service';
import { Store } from '@ngrx/store';
import { MODAL_DATA } from './../../../_services/modal.service';
import { Component, Inject } from '@angular/core';
import { deleteSubject } from 'src/app/_store/subjects/subjects.actions';
import {
  isLoading,
  selectCurrent,
} from 'src/app/_store/subjects/subjects.select';

export type DeleteSubjectModalData = {
  subjectId: string;
};

@Component({
  selector: 'app-delete-subject',
  templateUrl: './delete-subject.component.html',
  styleUrls: [],
})
export class DeleteSubjectComponent extends BaseComponent {
  subjectId!: number;
  isLoading!: boolean;

  constructor(
    @Inject(MODAL_DATA) public data: DeleteSubjectModalData,
    private modalService: ModalService,
    private store: Store,
    private router: Router
  ) {
    super();
  }

  handleDelete() {
    this.store.dispatch(
      deleteSubject({
        id: this.data.subjectId,
      })
    );
    this.store
      .select(selectCurrent)
      .pipe(takeUntil(this.destroy$))
      .subscribe((current) => {
        if (current === 'loading') this.isLoading = true;
        if (current === 'success') {
          this.modalService.dialogRef.close();
          this.router.navigate(['/dashboard/subjects']);
        }
      });
  }
}
