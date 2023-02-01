import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.headerService.isHandset$;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {}
}
