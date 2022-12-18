import { Injectable } from '@angular/core';
import { KEYWORDS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  public readonly title: string;
  public readonly favicon: string;
  public readonly description: string;
  public readonly ogImageUrl: string;
  public readonly keywords: string;

  constructor() {
    this.title = "Educate"; //change later
    this.favicon = "https://avatars.githubusercontent.com/u/68782786?v=4"; //change later
    this.description = "Learn by yourself"; //change later
    this.ogImageUrl = "https://www.educatetogether.ie/app/uploads/2019/02/EthicalEducationUpdated.png"; // !change it later
    this.keywords = KEYWORDS.join();
  }
}
