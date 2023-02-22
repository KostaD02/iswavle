import { Component, Input } from '@angular/core';
import { SubjectService } from '../../services';
import { SubjectInterface } from '../../interfaces';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent {
  @Input() subject: SubjectInterface = {
    name: "",
    isSelectable: false,
    subject: "",
    route: "",
    description:''
  }

  constructor(private subjectService: SubjectService) { }

  public activeSubject(){
    this.subjectService.activeSubject = this.subject;
  }
}
