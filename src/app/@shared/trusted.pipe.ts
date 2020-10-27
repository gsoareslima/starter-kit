import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'trusted' })
export class TrustedPipe {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
