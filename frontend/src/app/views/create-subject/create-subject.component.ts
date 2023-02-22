import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})
export class CreateSubjectComponent {

  public subject: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {
    this.initForm();
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
      isNativeElement: new FormControl(false, Validators.required),
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
      name: this.subject.value.name,
      isSelectable: this.subject.value.isSelectable,
      subject: this.subject.value.subject,
      route: this.subject.value.route,
      prefix: this.subject.value.prefix,
      description: this.subject.value.description,
      data: this.subject.value.data.map((element: any) => {
        return {
          isNativeElement: element.isNativeElement,
          isCodeExample: element.isCodeExample,
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
      }),
      tags: this.subject.value.tags.split(" "),
    };
    console.log(data);
  }

}
