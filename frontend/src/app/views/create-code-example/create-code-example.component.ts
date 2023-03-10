import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { WebRequestsService, SweetAlertModalsService } from '../../services';
import { SweetAlertIcon } from '../../enums';

@Component({
  selector: 'app-create-code-example',
  templateUrl: './create-code-example.component.html',
  styleUrls: ['./create-code-example.component.scss']
})
export class CreateCodeExampleComponent implements OnInit {
  public code: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private webRequestService: WebRequestsService, private sweetAlert: SweetAlertModalsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.code = this.fb.group({
      html: new FormControl(""),
      css: new FormControl(""),
      js: new FormControl(""),
      description: new FormControl("")
    });
  }

  public onSubmit() {
    const { html, css, js, description } = this.code.value;
    const result = {
      description,
      code: [html, css, js]
    };

    if (html || css || js) {
      this.webRequestService.post('code', result).pipe(
        tap(result => {
          console.log(result);
          this.sweetAlert.displayModal(SweetAlertIcon.Success, 'წარმატებით დაემატა', 'შეამოწმე კონსოლი');
        }),
      ).subscribe();
    }
  }
}
