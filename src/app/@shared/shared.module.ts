import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { AvatarComponent } from './avatar/avatar.component';
import { TrustedPipe } from './trusted.pipe';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, AvatarComponent, TrustedPipe, DateFormatPipe],
  exports: [LoaderComponent, AvatarComponent, TrustedPipe, DateFormatPipe],
})
export class SharedModule {}
