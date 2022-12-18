import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './module';
import { NoSanitizePipe } from './pipes';

import { AppComponent } from './app.component';
import { HeaderComponent, FooterComponent, CodeeditorComponent } from './shared';
import { HomepageComponent, NotfoundComponent, EditorComponent } from './views';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotfoundComponent,
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    EditorComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CodemirrorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
