import 'reflect-metadata';
import 'zone.js/dist/zone.js';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {LobbyComponent} from './lobby/lobby.component';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {ButtonComponent} from './widget/button/button.component';
import {WellComponent} from './widget/well/well.component';
import {WorldComponent} from './world/world.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'world',
    component: WorldComponent,

  },
  {
    path: 'lobby/:id',
    component: LobbyComponent,
  },
  {
    path: 'game/:id',
    component: GameComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],
  declarations: [
    AppComponent,
    LoginComponent,
    WorldComponent,
    GameComponent,
    LobbyComponent,
    WellComponent,
    ButtonComponent,
  ],
  providers: [
    LoginService,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
  ],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(console.log);
