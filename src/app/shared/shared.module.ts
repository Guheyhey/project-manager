import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DirectiveModule } from '../directive/directive.module';

const MATERIAL_MODULES = [
  MatToolbarModule, 
  MatIconModule, 
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTooltipModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

@NgModule({
  imports: [
    CommonModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    CommonModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  entryComponents: [ConfirmDialogComponent],
  declarations: [ConfirmDialogComponent]
})
export class SharedModule { }
