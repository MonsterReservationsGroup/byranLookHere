import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const collectJsTag = document.createElement('script')
collectJsTag.setAttribute('src', 'https://secure.networkmerchants.com/token/Collect.js')
collectJsTag.setAttribute('data-tokenization-key', environment.merchantKey)
document.body.append(collectJsTag)
