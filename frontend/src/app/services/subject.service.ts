import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SubjectInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  public readonly subjects$ = new BehaviorSubject<SubjectInterface[]>([]);
  public isSubjectLoaded: boolean = false;

  private readonly activeSubjectStream$ = new BehaviorSubject<SubjectInterface>({
    name: "",
    isSelectable: false,
    subject: "",
    route: ""
  });
  readonly activeSubject$ = this.activeSubjectStream$.asObservable();

  get activeSubject(): SubjectInterface {
    return this.activeSubjectStream$.value;
  }

  set activeSubject(subject: SubjectInterface) {
    this.isSubjectLoaded = true;
    this.activeSubjectStream$.next(subject);
  }
}
