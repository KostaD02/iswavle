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
    this.title = "iswavle.com | ცნობარი ქართულად";
    this.favicon = "https://iswavle.com/assets/images/banner_image.png";
    this.description = "შეისწავლე შენით";
    this.ogImageUrl = "https://raw.githubusercontent.com/KostaD02/iswavle/main/frontend/src/assets/images/meta_image.png";
    this.keywords = KEYWORDS.join();
  }
}
