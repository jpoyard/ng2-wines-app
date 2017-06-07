import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from 'angular2-logger/core';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';

@Component({
  selector: 'app-ox-wine-view',
  templateUrl: './ox-wine-view.component.html',
  styleUrls: ['./ox-wine-view.component.css']
})
export class OxWineViewComponent implements OnInit {
  private wine: Wine;
  private _country: Country;

  constructor(
    private logger: Logger,
    private router: Router,
    private route: ActivatedRoute,
    private oxCellarApiService: OxCellarApiService,
    private OxCountriesService: OxCountriesService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.wine = data.wine;
      this.OxCountriesService.get(this.wine.country).then(
        resolve => this._country = resolve
      );
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
    this.oxCellarApiService.delete(this.wine).then(
      (resolve) => this.router.navigate(['wines'])
    );
  }
}
