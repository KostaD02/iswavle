import { SweetAlertModalsService } from './../../../services/sweet-alert-modals.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SubjectInterface } from '../../../interfaces';
import { SeoServiceService, SubjectService } from '../../../services';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
})
export class SubjectComponent implements OnInit, OnDestroy {
  public readonly destroy$ = new Subject<void>();

  public spySubject: string = "";
  public isNavigation: boolean = false;

  private defaultSubject: SubjectInterface = {
    name: '',
    isSelectable: false,
    subject: '',
    route: ''
  }

  public subject: SubjectInterface = this.defaultSubject;
  public param: string = "";

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private seoService: SeoServiceService,
    private sweetAlertService: SweetAlertModalsService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      tap((event) => {
        if (event instanceof NavigationEnd) {
          const tree = this.router.parseUrl(this.router.url);
          if (tree.fragment) {
            const element = document.querySelector(`#${tree.fragment}`);
            if (element) {
              this.spySubject = tree.fragment;
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
        this.initSubject();
      }),
      takeUntil(this.destroy$)
    ).subscribe();
    this.initSubject();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initSubject() {
    this.param = this.router.url.split("/").pop()?.split("#").shift() || "";
    this.subjectService.activeSubject$.pipe(
      tap((subject) => {
        this.subject = subject;
        if (!this.subjectService.isSubjectLoaded) {
          this.subject = this.subjectService.subjects$.value.find(subject => subject.route === this.param) || this.defaultSubject;
        }
        if (this.subject.route !== this.param) {
          // ? adjusting value if user used load by history back
          this.subject = this.subjectService.subjects$.value.find(subject => subject.route === this.param) || this.defaultSubject;
        }
        if (this.subject.name !== '' && this.subject.route !== '' && this.subject.isSelectable) {
          const title = `Iswavle | ${this.subject.prefix} ${this.subject.name}`;
          if (title.length > 2) {
            this.seoService.updateTitle(title);
            this.seoService.updateMediaMetaTags('title',`${this.subject.prefix} ${this.subject.name}`);
            if (`${this.subject.prefix} ${this.subject.name}` !== this.subject.description) {
              this.seoService.updateMediaMetaTags('description',`${this.subject.description}`);
            } else {
              this.seoService.updateMediaMetaTags('description',`განხილული საკითხები: ${this.subject.tags?.join()}`);
            }
          }

          let count = 0;

          this.subject.data?.forEach(element => {
            if (element.navigation?.id || element.navigation?.name){
              count++;
            }
            this.isNavigation = count >= 1;
          });
        }
        setTimeout(() => { // ? Because of NG0100 have to use setTimeout, can't use either ngAfterViewInit
          this.initScrollSpies();
          this.initImgClick();
        }, 200);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public backRoute() {
    return this.getRoute(1);
  }

  public nextRoute() {
    return this.getRoute(-1);
  }

  private getRoute(option: number = 1) {
    const filterSelectableSubjects = this.subjectService.subjects$.value.filter(subject => subject.isSelectable);
    const currentSubjectIndex = filterSelectableSubjects.findIndex(subject => subject.route === this.subject.route);
    if (option === 1) {
      if (!filterSelectableSubjects[currentSubjectIndex - option]) {
        return '';
      }
      return (currentSubjectIndex === 0) ? '' : `/subject/${filterSelectableSubjects[currentSubjectIndex - option]?.route}`;
    } else {
      return (currentSubjectIndex + 1 === filterSelectableSubjects.length) ? '' : `/subject/${filterSelectableSubjects[currentSubjectIndex - option].route}`;
    }
  }

  private initScrollSpies() {
    const subjectsData = this.subject.data || [];
    const spyData = subjectsData.filter(data => data.navigation);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    };

    const observer = new IntersectionObserver((event: any) => {
      const target = event[0].target as HTMLElement;
      this.spySubject = target.id;
    }, options);

    spyData.forEach((element) => {
      const htmlElement = document.getElementById(element.navigation!.id) as Element;
      if (htmlElement) {
        observer.observe(htmlElement);
      }
    });

    this.destroy$.pipe(
      tap(() => {
        observer.disconnect();
      })
    ).subscribe();
  }

  private initImgClick() {
    if (this.subject.name !== '' && this.subject.route !== '' && this.subject.isSelectable) { // ? to be sure it's loaded
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.src.includes('assets') && img.src) { // ? filter only for external images
          img.style.cursor = 'pointer';
          img.addEventListener('click', () => {
            this.showImageFullSize(img.src)
          });
        }
      });
    }
  }

  private showImageFullSize(src: string) {
    this.sweetAlertService.showFullSizeImg(src);
  }
}
