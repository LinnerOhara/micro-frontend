import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ng-zorro-antd
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzIconModule } from 'ng-zorro-antd/icon'
// ng-zorro-antd
import { MenuComponent } from './common/layout/menu/menu.component';
import { SubMenuComponent } from './common/layout/menu/components/sub-menu/sub-menu.component';
import { AppInitService } from './common/services/app-init.service';

export function initializeApp(appInitService: AppInitService) {
  return (): void => {
    return appInitService.initializeApp();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SubMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NzButtonModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
