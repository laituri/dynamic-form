import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [CheckboxGroupComponent],
  entryComponents: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class CheckboxGroupModule {}