import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';

const MATERIAL_MODULES = [
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    ...MATERIAL_MODULES,
  ],
  declarations: []
})
export class SharedModule { }
