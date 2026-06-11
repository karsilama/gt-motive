import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
} from '@angular/core';
import { Router } from '@angular/router';
import { BrandsFacade } from '@brands/domain';
import { LabMiniFabButton } from '@lab/button/ui';
import { LabFormTextControl } from '@lab/forms/ui';
import { LabLoading } from '@lab/ui';
import { LabVirtualItem, LabVirtualScroll } from '@lab/virtual-scroll';

@Component({
  selector: 'lib-brand-list',
  imports: [LabVirtualScroll, LabLoading, LabFormTextControl, LabMiniFabButton],
  templateUrl: './brand-list.html',
  host: {
    style: 'display: flex; flex-direction: column; width: 100%; height: 100%;',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BrandList {
  public brandsFacade = inject(BrandsFacade);
  public router = inject(Router);

  public searchTerm = model<string>('');

  public readonly displayedColumns = ['Mark_ID', 'Mark_Name'];

  public loaded = this.brandsFacade.loaded;

  public dataSource = computed(() =>
    this.brandsFacade
      .allBrands()
      .map(
        (x) =>
          ({
            id: x.Make_ID,
            description: x.Make_Name,
          }) as LabVirtualItem,
      )
      .filter((x: LabVirtualItem) => {
        const term = this.searchTerm()?.toLowerCase().trim() ?? '';
        if (!term) return true;

        return (
          x.id.toString().includes(term) ||
          x.description.toLowerCase().includes(term)
        );
      }),
  );

  public onBrandSelected(id: string) {
    this.router.navigate([`/brands/${id}`]);
  }

  public reloadBrands() {
    this.brandsFacade.reloadBrands();
  }
}
