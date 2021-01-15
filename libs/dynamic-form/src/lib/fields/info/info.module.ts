import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [InfoComponent],
  entryComponents: [InfoComponent],
  imports: [CommonModule, MarkdownModule.forRoot({})],
  exports: [InfoComponent],
})
export class InfoModule {}