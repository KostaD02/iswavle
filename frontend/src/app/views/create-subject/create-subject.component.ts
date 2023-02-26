import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WebRequestsService, SweetAlertModalsService } from './../../services';
import { SubjectDataResponseInterface, SubjectInterface } from '../../interfaces';
import { SweetAlertIcon } from '../../enums';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent implements OnDestroy {
  public readonly destroy$ = new Subject<void>();
  public subject: FormGroup = this.fb.group({});
  public count: number = 0;

  constructor(
    private fb: FormBuilder,
    private webRequestsService: WebRequestsService,
    private sweetAlertModalsService: SweetAlertModalsService
  ) {
    this.initForm();
    this.webRequestsService.get('subjects').pipe(
      tap(result => {
        const response = result as SubjectInterface[];
        this.count = response.length + 1;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initForm(){
    this.subject = this.fb.group({
      name: new FormControl(null, Validators.required),
      isSelectable: new FormControl(false, Validators.required),
      subject: new FormControl(null, Validators.required),
      route: new FormControl(null, Validators.required),
      prefix: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      data: this.fb.array([]),
      tags: new FormControl('', Validators.required),
    });
  }

  get data(){
    return this.subject.get('data') as FormArray;
  }

  public addData(){
    this.data.push(this.fb.group({
      isNativeElement: new FormControl(true, Validators.required),
      isCodeExample: new FormControl(false, Validators.required),
      content: new FormControl(null, Validators.required),

      dataTitle: '',
      dataCode: '',
      dataLanguage: '',
      dataRouterLink: '',

      navigationName: new FormControl(null, Validators.required),
      navigationId: new FormControl(null, Validators.required),
    }));
  }

  public removeData(index: number){
    this.data.removeAt(index);
  }

  public createForm(){
    const data = {
      index: 0,
      name: this.subject.value.name,
      isSelectable: this.subject.value.isSelectable === 'true' ? true : false,
      subject: this.subject.value.subject,
      route: this.subject.value.route,
      prefix: this.subject.value.prefix,
      description: this.subject.value.description,
      translate: [], // ? is this necessary
      tags: this.subject.value.tags.split(" "),
      data: this.subject.value.data.map((element: any) => {
        const data: SubjectDataResponseInterface = {
          isNativeElement: element.isNativeElement === 'true' ? true : false,
          isCodeExample: element.isCodeExample === 'true' ? true : false,
          content: element.content,
          data: {
            title: element.dataTitle,
            code: element.dataCode,
            language: element.dataLanguage,
            routerLink: element.dataRouterLink
          },
          navigation: {
            name: element.navigationName,
            id: element.navigationId
          }
        }

        if (!data.isCodeExample && data.isNativeElement){
          delete data.data;
        }

        return data;
      }),
    };

    this.webRequestsService.post('subject', data).pipe(
      tap(result => {
        this.sweetAlertModalsService.displayModal(SweetAlertIcon.Success,'წარამტებით დაემატა', `დამატებული ობიექტი დალოგილია`);
        console.log(result);
      }),
      catchError(err => {
        this.sweetAlertModalsService.displayModal(SweetAlertIcon.Error, 'არასწორი რექუესტი','');
        console.log(err);
        throw 'incorrect request';
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
