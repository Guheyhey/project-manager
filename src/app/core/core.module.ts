import { NgModule, SkipSelf, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loadSvgResource } from '../utils/svg.util';


@NgModule({
  imports: [
    HttpModule,
    SharedModule,
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
    SidebarComponent
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
