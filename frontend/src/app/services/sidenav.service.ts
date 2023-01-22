import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  public readonly showSideNavContentStream$ = new BehaviorSubject<boolean>(true);

  private readonly toolBarTitleStream$ = new BehaviorSubject<string>('Tool bar name');
  readonly toolBarTitle$ = this.toolBarTitleStream$.asObservable();

  get toolBarTitle(): string {
    return this.toolBarTitleStream$.value;
  }

  set toolBarTitle(title: string) {
    this.toolBarTitleStream$.next(title);
  }

  constructor(private router: Router) {
    this.router.events.pipe(
      tap(() => {
        this.initToolBarText();
      })
    ).subscribe();
  }

  private initToolBarText() {
    //TODO correct
    const url = this.router.url.split("/")[1];
    this.toolBarTitle = url;
    this.showSideNavContentStream$.next(url === '');
  }
}
