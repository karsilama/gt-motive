import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  TrackByFunction,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HighlightPipe } from '@lab/util';
import { LabVirtualItem } from './virtual-scroll.model';

@Component({
  selector: 'lab-virtual-scroll',
  host: {
    style: 'display:block; width: 100%; height: 100%',
  },
  imports: [ScrollingModule, MatListModule, MatIconModule, HighlightPipe],
  templateUrl: './virtual-scroll.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabVirtualScroll {
  public elm = inject(ElementRef);

  public dataSource = input.required<LabVirtualItem[]>();

  public searchTerm = input<string>('');

  public itemSelected = output<string>();

  public onItemSelect(x: string) {
    this.itemSelected.emit(x);
  }

  public trackByItem(): TrackByFunction<LabVirtualItem> {
    return (_: number, item: LabVirtualItem) => item?.id;
  }
}
