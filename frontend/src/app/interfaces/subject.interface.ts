import { TranslateInterface } from './translate.interface';

export interface SubjectInterface {
  name: string;
  isSelectable: boolean;
  subject: string;
  route: string;
  index?: number;
  prefix?: string;
  translate?: TranslateInterface[];
  data?: string;
  createdAt?: string;
  description?: string;
}