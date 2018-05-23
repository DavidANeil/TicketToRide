import 'reflect-metadata';
import 'zone.js/dist/zone.js';

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {DisplayComponent} from './lobby/display/display.component';
import {LobbyComponent} from './lobby/lobby.component';
import {LobbyService} from './lobby/lobby.service';
import {LoginComponent} from './login/login.component';
import {LoginService} from './login/login.service';
import {XHR} from './services/xhr/xhr';
import {ButtonComponent} from './widget/button/button.component';
import {WellComponent} from './widget/well/well.component';
import {GameListComponent} from './world/gamelist/gamelist.component';
import {WorldComponent} from './world/world.component';
import {WorldService} from './world/world.service';

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
    GameListComponent,
    DisplayComponent,
  ],
  providers: [
    LobbyService,
    WorldService,
    LoginService,
    XHR,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    BrowserModule,
    FormsModule,
  ],
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(console.log);
