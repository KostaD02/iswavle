import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../../services';
import { SubjectInterface } from '../../../interfaces';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-default-subject',
  templateUrl: './default-subject.component.html',
  styleUrls: ['./default-subject.component.scss']
})
export class DefaultSubjectComponent implements OnInit {
  public subjects: SubjectInterface[] = [];
  constructor(private subjectService :SubjectService) { }

  ngOnInit(): void {
    this.subjectService.subjects$.asObservable().pipe(
      tap((subjects) => {
        this.subjects = subjects.filter(subject => subject.isSelectable);
      })
    ).subscribe();
  }

}
