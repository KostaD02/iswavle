import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoServiceService {

  constructor(private title: Title, private meta: Meta) { }

  public updateTitle(title: string) {
    this.title.setTitle(title);
  }

  public updateMetaTag(meta: string, content: string) {
    this.meta.addTag({ property: meta, content: content });
  }

  public updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach(meta => this.meta.updateTag(meta));
  }
}
