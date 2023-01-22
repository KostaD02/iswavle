import { Component, Input, OnInit } from '@angular/core';
import { SubjectService } from '../../services';
import { SubjectInterface } from '../../interfaces';

@Component({
  selector: 'app-subject-card',
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent implements OnInit {
  @Input() subject: SubjectInterface = {
    name: "",
    isSelectable: false,
    subject: "",
    route: "",
    description:''
  }
  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {}

  public activeSubject(){
    this.subjectService.activeSubject = this.subject;
  }
}
