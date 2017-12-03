import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatTabsModule,
    MatNativeDateModule,
    MatIconModule,
  ]
})
export class MaterialModule {}