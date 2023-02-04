import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { SubjectInterface } from '../../interfaces';
import { HeaderService, SubjectService, WebRequestsService } from '../../services';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit, OnDestroy {
  public readonly isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public readonly destroy$ = new Subject<void>();

  public subject: SubjectInterface[] = [];
  public isLoaded: boolean = false;

  public isMatch: boolean = true;
  public searchValue: string = "";

  constructor(
    private headerService: HeaderService,
    private subjectService: SubjectService,
    private webRequestsService: WebRequestsService
  ) { }

  ngOnInit(): void {
    this.webRequestsService.get('subjects').pipe(
      tap((subjects) => {
        this.isLoaded = true;
        const subjectsArray = subjects as SubjectInterface[];
        this.subjectService.subjects$.next(subjectsArray);
        this.subject = subjectsArray;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public activeSubject(subject: SubjectInterface) {
    this.subjectService.activeSubject = subject;
  }

  public filter() {
    this.subject = this.subject.filter(subject => `${subject.prefix ?? ''} ${subject.name}`.trim().toLowerCase().includes(this.searchValue.toLowerCase()) && subject.isSelectable);
    this.isMatch = this.subject.length >= 0;

    if (!this.searchValue || this.searchValue.length === 0) {
      this.subject = this.subjectService.subjects$.value;
      this.isMatch = true;
    }
  }
}
