import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './module';
import { CapitalizePipe, HtmlTagPipe, NoSanitizePipe, SubjectFormatter } from './pipes';
import { HeaderComponent, FooterComponent, CodeeditorComponent, ExampleCodeComponent, ExternalSourceComponent, SubjectCardComponent, ErrorOutputComponent } from './shared';
import { HomepageComponent, NotfoundComponent, EditorComponent, DefaultSubjectComponent, SubjectComponent, SubjectsComponent } from './views';
import { HtmlTagDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotfoundComponent,
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    EditorComponent,
    NoSanitizePipe,
    SubjectFormatter,
    SubjectsComponent,
    CapitalizePipe,
    SubjectComponent,
    DefaultSubjectComponent,
    ExternalSourceComponent,
    ExampleCodeComponent,
    SubjectCardComponent,
    ErrorOutputComponent,
    HtmlTagDirective,
    HtmlTagPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    CodemirrorModule,
    ScrollingModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
