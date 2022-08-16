import { SubjectService } from './../../../../_services/subjects.service';
import { takeUntil, switchMap, Observable } from 'rxjs';
import { BaseComponent } from './../../../../_utils/base.component';
import { ISubject } from './../../../../_models/ISubject';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((paramMap: any, index: number) => {
          const id = paramMap.get('id');
          if (!id) return new Observable();
          return this.subjectService.fetchById(id);
        })
      )
      .subscribe((subject) => {
        this.subject = subject as ISubject;
      });
  }
}
