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

  public updateMetaTagProperty(meta: string, content: string) {
    this.meta.removeTag(`property="${meta}"`);
    this.meta.addTag({ property: meta, content: content });
  }

  public updateMetaTagName(meta: string, content: string) {
    this.meta.removeTag(`name="${meta}"`);
    this.meta.addTag({ name: meta, content: content });
  }

  public updateMetaTags(metaTags: MetaDefinition[]) {
    metaTags.forEach(meta => this.meta.updateTag(meta));
  }
}
