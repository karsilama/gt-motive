import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractButton } from './button.abstract';

@Component({
  selector: 'lab-button',
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button
      matButton
      aria-label="{{ arialLabel() }}"
      [color]="color()"
      (click)="onClick($event)"
    >
      @if (icon()) {
        <mat-icon>{{ icon() }}</mat-icon>
      }
      <ng-content> </ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabButton extends AbstractButton {
  public override onClick(e: Event) {
    this.execute.emit(e);
  }
}
