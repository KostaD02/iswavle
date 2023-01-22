import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SubjectInterface } from '../../interfaces';
import { HeaderService, SubjectService, WebRequestsService } from '../../services';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  public subject: SubjectInterface[] = [];
  public isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public isLoaded: boolean = false;

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
      })
    ).subscribe();
  }

  public activeSubject(subject: SubjectInterface) {
    this.subjectService.activeSubject = subject;
  }
}
