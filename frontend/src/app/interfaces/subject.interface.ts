import { TranslateInterface } from './translate.interface';

export interface SubjectInterface {
  name: string;
  isSelectable: boolean;
  subject: string;
  route: string;
  index?: number;
  prefix?: string;
  translate?: TranslateInterface[];
  data?: SubjectDataResponseInterface[];
  createdAt?: string;
  description?: string;
}

export interface SubjectCodeExampleInterface {
  title?: string,
  code: string,
  language: string,
  routerLink: string
}

export interface SubjectDataResponseInterface {
  isNativeElement: boolean,
  isCodeExample: boolean,
  content: string;
  data?: SubjectCodeExampleInterface;
}