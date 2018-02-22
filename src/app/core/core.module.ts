import { NgModule, SkipSelf, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResource } from '../utils/svg.util';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';

import 'hammerjs';
import 'rxjs/add/operator/take';
import '../utils/debug.util';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AppRoutingModule
  ],
  providers: [
    { 
      provide: 'BASE_CONFIG', useValue: {
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule { 
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    ir: MatIconRegistry, 
    ds: DomSanitizer
  ) {
    if (parent) {
      throw new Error('Module already exist, Cannot load again');
    }
    loadSvgResource(ir, ds)
  }
}
