import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { SubjectInterface } from '../../interfaces';
import { HeaderService, SubjectService, WebRequestsService } from '../../services';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opacity: 0
      })),
      transition('in => out', animate('500ms ease-out')),
      transition('out => in', animate('500ms ease-in'))
    ])
  ],
})
export class SubjectsComponent implements OnInit ,OnDestroy {
  public readonly isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public readonly destroy$ = new Subject<void>();

  public subject: SubjectInterface[] = [];
  public isLoaded: boolean = false;

  public isMatch: boolean = true;
  public searchValue: string = "";

  public showScroll: boolean = false;

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
    this.searchValue = "";
    this.filterSubject();
  }

  public filterSubject() {
    this.subject = this.subjectService.subjects$.value.filter(subject =>
      (`${subject.prefix ?? ''} ${subject.name}`.trim().toLowerCase().includes(this.searchValue.toLowerCase())
        || subject.tags?.map(chip => chip.toLocaleLowerCase()).filter(text => text.search(this.searchValue.toLowerCase()) !== -1).length)
      && subject.isSelectable);

    this.isMatch = this.subject.length > 0;

    if (!this.searchValue || this.searchValue.length === 0) {
      this.subject = this.subjectService.subjects$.value;
      this.isMatch = true;
    }
  }

  public onScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.showScroll = target.scrollTop >= (target.scrollHeight * 0.1);
  }
}
