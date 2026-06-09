import { Directive, input, output } from '@angular/core';

@Directive()
export abstract class AbstractButton {
  /**
   * Real inclusive library
   */
  public arialLabel = input.required();

  /**
   * Optional inputs
   */
  public icon = input<string>();
  public color = input<'primary' | 'accent' | 'warn'>();

  /**
   * Output event
   */
  public execute = output<Event>();

  public abstract onClick(e: Event): void;
}
