import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SharedFunctionsService } from '../../services';

@Component({
  selector: 'app-facebook-comment',
  templateUrl: './facebook-comment.component.html',
  styleUrls: ['./facebook-comment.component.scss']
})
export class FacebookCommentComponent implements AfterViewInit {
  public url: string = '';
  public isLoaded: boolean = false;

  constructor(private sharedFunc: SharedFunctionsService, private router: Router) {
    this.url = location.href.replace('http://localhost:4200', 'https://iswavle.com');
    this.router.events.pipe(
      tap((event) => {
        if (event instanceof NavigationEnd && this.isLoaded) {
          this.url = location.href.replace('http://localhost:4200', 'https://iswavle.com');
          setTimeout(() => {
            (window as any)['FB'].XFBML.parse();
          }, 500);
        }
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    const js = document.createElement('script');
    js.src = 'https://connect.facebook.net/ka_GE/sdk.js#xfbml=1&version=v16.0&appId=569424085182164&autoLogAppEvents=1';
    js.setAttribute('nonce', this.sharedFunc.generateRandomString(16));
    js.setAttribute('crossorigin', 'anonymous');

    document.head.appendChild(js);

    js.onload = () => {
      (window as any)['FB'].init({
        appId: 569424085182164,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v11.0',
      });
      setTimeout(() => {
        (window as any)['FB'].XFBML.parse();
        this.isLoaded = true;
      }, 500);
    };
  }
}
