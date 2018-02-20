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
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';

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
    ImageListSelectComponent,
    ...MATERIAL_MODULES,
  ],
  entryComponents: [ConfirmDialogComponent],
  declarations: [
    ConfirmDialogComponent, 
    ImageListSelectComponent
  ]
})
export class SharedModule { }
