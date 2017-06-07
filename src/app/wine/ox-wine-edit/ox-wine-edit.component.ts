import { MdAutocompleteModule } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

import { OxCountriesService } from '../../country/ox-countries.service';
import { Country } from '../../country/country';


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
  private countries = new Array<Country>();

  constructor(
    private logger: Logger,
    private router: Router,
    private route: ActivatedRoute,
    private oxCellarApiService: OxCellarApiService,
    private OxCountriesService: OxCountriesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.wine = data.wine;
      this.logger.info(this.wine);
      this.OxCountriesService.getAll().then(
        countries => {
          this.countries = countries;
          this.country = this.countries.find(country => country.code === this.wine.country);
          this.logger.info(this.country);
          this.createForm();
        }
      );
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

    this.oxCellarApiService.update(this.wine).then(
      (resolve) => this.router.navigate([this.wine.id, 'view'], { relativeTo: this.route.parent })
    );
  }
}
