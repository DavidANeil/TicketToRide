import {Component} from '@angular/core';

console.log('included at least');
@Component({
  selector: 'root-gui',
  // template: require('./app.component.html'),
  // template: '<div>HII</div>',
  templateUrl: '/serve/app.component.html',
})
export class AppComponent {
  constructor() {
    console.log('constructed');
  }
}