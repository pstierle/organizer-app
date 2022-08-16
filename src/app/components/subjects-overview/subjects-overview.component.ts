import {
  selectGroupedBySemester,
  IGroupedBySemester,
} from './../../_store/subjects/subjects.select';
import { getSubjects } from './../../_store/subjects/subjects.actions';
import { ISubject } from './../../_models/ISubject';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { ModalService } from './../../_services/modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddSubjectComponent } from '../modal/add-subject/add-subject.component';
import { Store } from '@ngrx/store';
import {
  isLoading,
  selectCurrent,
  selectSubjects,
} from 'src/app/_store/subjects/subjects.select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects-overview',
  templateUrl: './subjects-overview.component.html',
  styleUrls: [],
})
export class SubjectsOverviewComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  isLoading$!: Observable<boolean>;
  groupedBySemester!: IGroupedBySemester[];
  currentRoute = '';

  constructor(
    private modalService: ModalService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSubjects());
    this.store
      .select(selectGroupedBySemester)
      .pipe(takeUntil(this.destroy$))
      .subscribe((grouped) => {
        this.groupedBySemester = grouped;
        console.log(this.groupedBySemester);
      });
    this.isLoading$ = this.store.select(isLoading);
    this.currentRoute = this.router.url;
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((evt) => {
      if ((evt as any).url) this.currentRoute = (evt as any).url;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  handleOpenAddSubjectModal() {
    this.modalService.open<AddSubjectComponent>(AddSubjectComponent);
  }
}
