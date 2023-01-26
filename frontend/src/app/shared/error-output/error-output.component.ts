import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-error-output',
  templateUrl: './error-output.component.html',
  styleUrls: ['./error-output.component.scss']
})
export class ErrorOutputComponent implements OnInit {

  @Input() error: string = '';
  @Input() hasError: boolean = false;

  constructor(private clipBoard: Clipboard) { }

  ngOnInit(): void {
  }

  copyError(){
    this.clipBoard.copy(this.error);
  }

}
