import 'reflect-metadata';
import 'zone.js/dist/zone.js';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';

console.log('bootstrapping');

@NgModule({
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(console.log);
