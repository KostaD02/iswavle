import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SubjectInterface } from 'src/app/interfaces';
import { InformationService, SubjectService } from 'src/app/services';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subject!: SubjectInterface;
  param: string = "";

  constructor(
    private router: Router,
    private subjectService: SubjectService,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      tap(() => {
        this.initSubject();
      })
    ).subscribe();
    this.initSubject();
  }

  private initSubject() {
    this.param = this.router.url.split("/").pop() || "";
    this.subjectService.activeSubject$.pipe(
      tap((subject) => {
        this.subject = subject;
        if(!this.subjectService.isSubjectLoaded){
          this.subject = this.subjectService.subjects$.value.find(subject => subject.route === this.param) || this.subjectService.subjects$.value[0];
        }
        if (this.subject.route !== this.param) {
          // ? adjusting value if user used load by history back
          this.subject = this.subjectService.subjects$.value.find(subject => subject.route === this.param) || this.subjectService.subjects$.value[0];
        }
      }),
    ).subscribe();
  }
}
