import { Pipe, PipeTransform } from '@angular/core';
import { SubjectInterface } from '../interfaces';

@Pipe({
  name: 'subjectFormatter'
})
export class SubjectFormatter implements PipeTransform {

  transform(subject: SubjectInterface): string {
    return `${subject.prefix ?? ''} ${subject.name}`.trim();
  }

}
