import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable, tap } from 'rxjs';
import { SubjectInterface } from './interfaces';
import { HeaderService, SeoServiceService, SubjectService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({
        opacity: 1
      })),
      state('out', style({
        opacity: 0
      })),
      transition('in => out', animate('500ms ease-out')),
      transition('out => in', animate('500ms ease-in'))
    ])
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  public toolBarName: string = "";

  public isRouteSubject: boolean = true;
  public isRouteNotFound: boolean = false;

  public isHandset$: Observable<boolean> = this.headerService.isHandset$;
  public subjects: SubjectInterface[] = [];

  public isMatch: boolean = true;
  public searchValue: string = "";

  public showScroll: boolean = false;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoServiceService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      (this.scrollContainer.nativeElement as HTMLElement).scroll({ top: 0, left: 0, behavior: 'smooth' }); // scroll up on load
    }, 10);

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
      this.toolBarName = data['title'] || "";
    });
  }

  public filterSubject() {
    this.subjects = this.subjectService.subjects$.value.filter(subject =>
      (`${subject.prefix ?? ''} ${subject.name}`.trim().toLowerCase().includes(this.searchValue.toLowerCase())
        || subject.tags?.map(chip => chip.toLocaleLowerCase()).filter(text => text.search(this.searchValue.toLowerCase()) !== -1).length)
      && subject.isSelectable);

    this.isMatch = this.subjects.length > 0;

    if (!this.searchValue || this.searchValue.length === 0) {
      this.subjects = this.subjectService.subjects$.value;
      this.isMatch = true;
    }
  }

  public onScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.showScroll = target.scrollTop >= (target.scrollHeight * 0.1);
  }

  public clearSearch() {
    this.searchValue = "";
    this.filterSubject();
  }
}
