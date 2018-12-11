import { NgModule } from '@angular/core';
import { MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AngularMaterialModule {}
