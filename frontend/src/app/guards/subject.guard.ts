import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { WebRequestsService } from './../services';

@Injectable({
  providedIn: 'root'
})
export class SubjectGuard implements CanActivate {

  constructor(private router: Router, private webRequestsService: WebRequestsService) { }

  canActivate() {
    const path = localStorage.getItem('path') || 'none';
    return this.webRequestsService.get(`is_admin/${path}`).pipe(
      map((response: any) => {
        if (response.isAdmin) {
          return true;
        } else {
          return this.router.parseUrl('/');
        }
      })
    );
  }
}
