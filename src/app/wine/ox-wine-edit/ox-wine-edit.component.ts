import { MdAutocompleteModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/root.types';
import { WinesActions } from '../wines.actions';

@Component({
  selector: 'app-ox-wine-edit',
  templateUrl: './ox-wine-edit.component.html',
  styleUrls: ['./ox-wine-edit.component.css']
})
export class OxWineEditComponent implements OnInit {
  wineForm: FormGroup;
  filteredCountries: any;
  private wine: Wine;
  private country: Country;
  private countries: Array<Country>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private oxCellarApiService: OxCellarApiService,
    private OxCountriesService: OxCountriesService,
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private actions: WinesActions
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.wine = data.wine;
      this.countries = data.countries;
      this.country = this.countries.find(country => country.code === this.wine.country);
      this.createForm();
      // TODO - 1 - select Wine - selectWineSucceeded
      // this.ngRedux.dispatch(XXX);
    });
  }

  createForm() {
    this.wineForm = this.fb.group({
      name: [this.wine.name, Validators.required],
      country: this.country,
      region: this.wine.region,
      description: this.wine.description,
      price: [this.wine.price, Validators.required],
      year: [this.wine.year, Validators.required]
    });

    this.filteredCountries = this.wineForm.controls.country.valueChanges
      .startWith(null)
      .map(name => this.filterCountries(name));
  }

  filterCountries(val: string) {
    const filteredCountries =
      val ? this.countries.filter(country => new RegExp(`^${val}`, 'gi').test(country.en))
        : this.countries;
    return filteredCountries;
  }

  displayCountry(country: Country): string {
    return country ? country.en : '';
  }

  get imgSource() {
    return this.oxCellarApiService.getImageSourceUrl(this.wine.id);
  }

  cancel(event) {
    event.preventDefault();
    this.router.navigate([this.wine.id, 'view'], { relativeTo: this.route.parent });
  }

  update(event) {
    event.preventDefault();

    this.wine.name = this.wineForm.value.name;
    this.wine.country = this.wineForm.value.country ? this.wineForm.value.country.code : '';
    this.wine.region = this.wineForm.value.region;
    this.wine.description = this.wineForm.value.description;
    this.wine.price = this.wineForm.value.price;
    this.wine.year = this.wineForm.value.year;

    // TODO - 3 - update Wine
    // this.ngRedux.dispatch(XXX);
  }
}
