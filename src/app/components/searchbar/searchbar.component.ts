import { SubjectService } from './../../_services/subjects.service';
import { BaseComponent } from './../../_utils/base.component';
import { debounceTime, Subject, takeUntil, switchMap, Observable } from 'rxjs';
import { ISubject } from './../../_models/ISubject';
import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: [],
})
export class SearchbarComponent extends BaseComponent implements OnInit {
  searchIcon = faMagnifyingGlass;
  showResults = false;
  results: ISubject[] = [];
  query$ = new Subject<string>();
  queryValue = '';

  constructor(private subjectService: SubjectService) {
    super();
  }

  ngOnInit(): void {
    this.query$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400),
        switchMap((query) => {
          if (!query) {
            return new Observable();
          }
          return this.subjectService.queryByName(query);
        })
      )
      .subscribe((subjects) => {
        if (!subjects) {
          this.results = [];
          return;
        } else {
          this.results = subjects as ISubject[];
        }
      });
  }

  handleFocus() {
    this.showResults = true;
  }

  handleClickoutside() {
    this.showResults = false;
    this.results = [];
    this.query$.next('');
    this.queryValue = '';
  }

  handleChange(val: string) {
    this.query$.next(val);
  }

  handleAddToHistory() {}
}
