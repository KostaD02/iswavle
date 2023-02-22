import { SweetAlertModalsService } from './../../services/sweet-alert-modals.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {

  constructor(private router: Router, private sweetAlert: SweetAlertModalsService) {
    setTimeout(() => {
      this.sweetAlert.displayToast('მთავარ გვერდზე დაბრუნება', 'info', '#3f51b5');
      this.router.navigateByUrl('/');
    }, 10000);
  }
}
