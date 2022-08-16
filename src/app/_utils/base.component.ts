import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BaseComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    console.log('des');
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
