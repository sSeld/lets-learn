import {enableProdMode, Inject, PlatformRef} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let platformRef: PlatformRef = platformBrowserDynamic();



console.log('testing');


// class Engine {
//
// }
// class Car {
//   constructor(@Inject(Engine) engine) {
//   }
// }
//



  platformRef.bootstrapModule(AppModule)
  .catch(err => console.error(err));
