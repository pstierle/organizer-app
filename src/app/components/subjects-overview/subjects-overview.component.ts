import { BaseComponent } from './../../_utils/base.component';
import {
  selectGroupedBySemester,
  IGroupedBySemester,
} from './../../_store/subjects/subjects.select';
import { getSubjects } from './../../_store/subjects/subjects.actions';
import { Observable, takeUntil } from 'rxjs';
import { ModalService } from './../../_services/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddSubjectComponent } from '../modal/add-subject/add-subject.component';
import { Store } from '@ngrx/store';
import { isLoading } from 'src/app/_store/subjects/subjects.select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects-overview',
  templateUrl: './subjects-overview.component.html',
  styleUrls: [],
})
export class SubjectsOverviewComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  isLoading$!: Observable<boolean>;
  groupedBySemester!: IGroupedBySemester[];
  currentRoute = '';

  constructor(
    private modalService: ModalService,
    private store: Store,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(getSubjects());
    this.store
      .select(selectGroupedBySemester)
      .pipe(takeUntil(this.destroy$))
      .subscribe((grouped) => {
        this.groupedBySemester = grouped;
      });
    this.isLoading$ = this.store.select(isLoading);
    this.currentRoute = this.router.url;
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((evt) => {
      if ((evt as any).url) this.currentRoute = (evt as any).url;
    });
  }

  handleOpenAddSubjectModal() {
    this.modalService.open<AddSubjectComponent, any>(AddSubjectComponent);
  }
}
