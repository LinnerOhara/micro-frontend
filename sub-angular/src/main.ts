import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef } from '@angular/core';
import { AppModule } from './app/app.module';
import './public-path';

let app: void | NgModuleRef<AppModule>;
async function render() {
  app = await platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props: Object) {
  console.log('sub-angular bootstrap', props);
}

export async function mount(props: Object) {
  console.log('sub-angular mount', props)
  render();
}

export async function unmount(props: Object) {
  console.log('sub-angular unmount', props);
  // @ts-ignore
  platformBrowserDynamic().destroy()
}
