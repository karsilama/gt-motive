import { Component, computed, input, ModelSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'lab-form-text-control',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  host: {
    style: 'padding: 16px; display: flex; box-sizing: border-box',
  },
  templateUrl: './form-text-control.html',
})
export class LabFormTextControl {
  public searchTerm = input.required<ModelSignal<string>>();

  public value = computed(() => this.searchTerm()());

  public readonly label = input.required<string>();
  public readonly placeholder = input.required<string>();
  public readonly hint = input.required<string>();
  public readonly iconSuffix = input<string>();

  public readonly showClearField = computed(() => {
    return !!this.value().length;
  });

  public onClearField() {
    this.searchTerm().set('');
  }

  public onInput(e: Event) {
    const value = (e?.target as HTMLInputElement).value;
    this.searchTerm().set(value ?? '');
  }
}
