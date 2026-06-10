import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsFacade } from '@brands/domain';
import { LabButton } from '@lab/button/ui';
import { LabLoading } from '@lab/ui';

@Component({
  selector: 'lib-brand-edit',
  imports: [LabLoading, LabButton],
  templateUrl: './brand-edit.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandEdit {
  public route = inject(ActivatedRoute);
  public location = inject(Location);
  public brandsFacade = inject(BrandsFacade);

  public brandSelected = this.brandsFacade.brandSelected;

  constructor() {
    this.brandsFacade.getBrandsById(this.route.snapshot.params['id']);
  }

  public goBack() {
    this.location.back();
  }
}
