import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import "codemirror/lib/codemirror";
import "codemirror/keymap/sublime";

import "codemirror/mode/xml/xml";
import "codemirror/mode/htmlembedded/htmlembedded"
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";

import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint";

import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/markdown-fold";
import "codemirror/addon/fold/foldgutter";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
