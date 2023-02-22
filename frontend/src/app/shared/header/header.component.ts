import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isHandset$: Observable<boolean> = this.headerService.isHandset$;

  constructor(private headerService: HeaderService) { }
}
