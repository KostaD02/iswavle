import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubjectService } from '../../../services';
import { SubjectInterface } from '../../../interfaces';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-default-subject',
  templateUrl: './default-subject.component.html',
  styleUrls: ['./default-subject.component.scss']
})
export class DefaultSubjectComponent implements OnInit, OnDestroy {
  public readonly destroy$ = new Subject<void>();

  public subjects: SubjectInterface[] = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.subjectService.subjects$.asObservable().pipe(
      tap((subjects) => {
        this.subjects = subjects.filter(subject => subject.isSelectable);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
