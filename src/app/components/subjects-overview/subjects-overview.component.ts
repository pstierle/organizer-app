import { getSubjects } from './../../_store/subjects/subjects.actions';
import { ISubject } from './../../_models/ISubject';
import { Observable, Subscription } from 'rxjs';
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
  subjects$!: Observable<ISubject[]>;
  isLoading$!: Observable<boolean>;
  currentRoute = '';
  subscription!: Subscription;

  constructor(
    private modalService: ModalService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSubjects());
    this.subjects$ = this.store.select(selectSubjects);
    this.isLoading$ = this.store.select(isLoading);
    this.currentRoute = this.router.url;
    this.subscription = this.router.events.subscribe((evt) => {
      if ((evt as any).url) this.currentRoute = (evt as any).url;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleOpenAddSubjectModal() {
    this.modalService.open<AddSubjectComponent>(AddSubjectComponent);
  }
}
