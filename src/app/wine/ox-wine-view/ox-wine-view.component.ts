import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/root.types';
import { WinesActions } from '../wines.actions';

@Component({
  selector: 'app-ox-wine-view',
  templateUrl: './ox-wine-view.component.html',
  styleUrls: ['./ox-wine-view.component.css']
})
export class OxWineViewComponent implements OnInit {
  private wine: Wine;
  private _country: Country;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oxCellarApiService: OxCellarApiService,
    private OxCountriesService: OxCountriesService,
    private ngRedux: NgRedux<IAppState>,
    private actions: WinesActions
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.wine = data.wine;
      this.OxCountriesService.get(this.wine.country).then(
        resolve => this._country = resolve
      );
      // TODO - 1 - select Wine - selectWineSucceeded
      // this.ngRedux.dispatch(XXX);
    });
  }

  get imgSource() {
    return this.oxCellarApiService.getImageSourceUrl(this.wine.id);
  }

  get country() {
    return this._country ? this._country.en : undefined;
  }

  edit(event) {
    event.preventDefault();
    this.router.navigate([this.wine.id, 'edit'], { relativeTo: this.route.parent });
  }

  remove(event) {
    event.preventDefault();
    // TODO - 2 - delete Wine
    // this.ngRedux.dispatch(XXX);
  }
}
