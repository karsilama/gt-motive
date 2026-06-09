import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'lab-avatar',
  imports: [MatListModule],
  templateUrl: './avatar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabAvatar {
  public src = input.required<string>();
  constructor() {
    effect(() => {
      console.log(this.src());
    });
  }
}
