import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { QuoteService } from './quote.service';
import { ProjectService } from './project.service';

export {
  QuoteService,
}

@NgModule()
export class ServicesModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        QuoteService,
        ProjectService
      ]
    }
  }
}
