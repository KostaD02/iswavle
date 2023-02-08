import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderService, InformationService, SeoServiceService, SidenavService, SubjectService } from './services';
import { filter, map, mergeMap, Observable, tap } from 'rxjs';
import { SubjectInterface } from './interfaces';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public toolBarName: string = this.sideNavService.toolBarTitle;
  public showToolBar: boolean = this.sideNavService.showSideNavContentStream$.value;
  public isRouteSubject: boolean = true;
  public isRouteNotFound: boolean = false;

  public isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public subjects: SubjectInterface[] = [];

  public isMatch: boolean = true;
  public searchValue: string = "";


  constructor(
    private router: Router,
    private headerService: HeaderService,
    private sideNavService: SidenavService,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoServiceService
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
        this.isRouteNotFound = title[0] === '404';
      }),
      filter(e => e instanceof NavigationEnd),
      map(e => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    ).subscribe(data => {
      let seoData = data['seo'];
      if (seoData) {
        if (seoData['title']) this.seoService.updateTitle(seoData['title']);
        if (seoData['metaTags']) this.seoService.updateMetaTags(seoData['metaTags']);
      }
    });
  }

  public filterSubject() {
    this.subjects = this.subjects.filter(subject => `${subject.prefix ?? ''} ${subject.name}`.trim().toLowerCase().includes(this.searchValue.toLowerCase()) && subject.isSelectable);
    this.isMatch = this.subjects.length >= 0;

    if (!this.searchValue || this.searchValue.length === 0) {
      this.subjects = this.subjectService.subjects$.value;
      this.isMatch = true;
    }
  }
}
