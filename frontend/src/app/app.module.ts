import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CommonModuleModule, DirectiveModule, PipeModule, SharedModule } from './module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModuleModule,
    SharedModule,
    PipeModule,
    DirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
