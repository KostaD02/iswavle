import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  startDate: number = 2023;
  displayDate: string = "2023";
  constructor() { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    if (this.startDate !== currentYear){
      this.displayDate = `${this.startDate}-${currentYear}`;
    }
  }

}
