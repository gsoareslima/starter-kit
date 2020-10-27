import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

type rouded = false | true | 'top' | 'right' | 'bottom' | 'left' | 'circle';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() url: string;
  @Input() size: string;
  @Input() rounded: rouded;

  ngOnInit() {}

  getRoudedClass(): string {
    if (typeof this.rounded == 'boolean') {
      return this.rounded ? 'rounded' : 'rounded-0';
    }
    return `rounded-${this.rounded}`;
  }
}
