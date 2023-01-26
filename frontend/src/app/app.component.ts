import { Component, OnInit } from '@angular/core';
import { HeaderService, InformationService, SidenavService, SubjectService } from './services';
import { Observable, tap } from 'rxjs';
import { SubjectInterface } from './interfaces';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public toolBarName: string = this.sideNavService.toolBarTitle;
  public showToolBar: boolean = this.sideNavService.showSideNavContentStream$.value;
  public isRouteSubject: boolean = true;

  public isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public subjects: SubjectInterface[] = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private headerService: HeaderService,
    private sideNavService: SidenavService,
    private subjectService: SubjectService,
    private informationService: InformationService
  ) { }

  ngOnInit(): void {
    this.sideNavService.toolBarTitle$.pipe(
      tap((title: string) => {
        this.toolBarName = title;
      })
    ).subscribe();

    this.sideNavService.showSideNavContentStream$.pipe(
      tap((show: boolean) => {
        this.showToolBar = !show;
      })
    ).subscribe();

    this.subjectService.subjects$.asObservable().pipe(
      tap((subjects) => {
        this.subjects = subjects;
      })
    ).subscribe();

    this.router.events.pipe(
      tap(() => {
        const title = this.router.url.split('/').slice(1).map(route => {
          const routeArray = route.split("");
          routeArray[0] = routeArray[0]?.toUpperCase();
          return routeArray.join('');
        }).map(value => {
          return value.split("_").join(" ");
        });
        this.isRouteSubject = title[0] === 'Subject';
        this.titleService.setTitle(`${(title?.length === 0 || title === undefined || title[0] === '') ? this.informationService.title : title.join(' | ')}`);
      })
    ).subscribe();
  }
}
