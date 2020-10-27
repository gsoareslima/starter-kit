import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe {
  constructor(private translateService: TranslateService) {}

  transform(date: string, defaultIfInvalid?: string) {
    let dateMoment = moment(date);
    if (!dateMoment.isValid() || !date) return defaultIfInvalid;
    return dateMoment.format(this.translateService.instant('dateFormat'));
  }
}
