import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlTag'
})
export class HtmlTagPipe implements PipeTransform {

  transform(value: string, isClosingTag: boolean = false): string {
    return `<${isClosingTag ? '/' : ''}${value}>`;
  }

}
