import { Component, OnInit } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/mergeMap';

import { OxCellarApiService } from '../ox-cellar-api.service';
import { Wine } from '../wine';

@Component({
  selector: 'app-ox-wines-list',
  templateUrl: './ox-wines-list.component.html',
  styleUrls: ['./ox-wines-list.component.css'],
})
export class OxWinesListComponent implements OnInit {
  private _wines: Array<Wine>;
  private _selectedWine: Wine;

  private _filter: string;
  private _filters: Array<string>;
  private _sorting: string;
  private _skipValue: number;
  private _limitValue: number;

  constructor(
    private oxCellarApiService: OxCellarApiService,
    private logger: Logger,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this._filters = new Array();
  }

  ngOnInit() {
    this.update();

    // a wine was removed
    this.oxCellarApiService.removed$.subscribe(
      value => {
        if (this._wines) {
          this.logger.info(`removed wine ${value} in list`);
          this._wines = this._wines.filter(wine => wine.id !== value);
        }
      }
    );

    // a wine was updated
    this.oxCellarApiService.updated$.subscribe(
      (updatedWine: Wine) => {
        if (this._wines) {
          this.logger.info(`updated wine ${updatedWine.id} in list`);
          const index = this._wines.findIndex(wine => wine.id === updatedWine.id);
          if (index > -1) {
            this._wines[index] = updatedWine;
          }
        }
      }
    );

    // NavigationEnd
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event: any) => {
        this._selectedWine = <Wine>event.wine;
      });
  }


  update() {
    this.oxCellarApiService.query(this._filters, this._sorting, this._skipValue, this._limitValue).then(
      response => this._wines = response.items
    );
  }

  set sorting(sorting: string) {
    this._sorting = sorting;
    this.update();
  }
  get sorting() {
    return this._sorting;
  }

  set filter(filter: string) {
    this._filter = filter;
    this._filters[0] = `name:${filter}`;
    this.update();
  }

  get filter() {
    return this._filter;
  }

  getImgSource(wine: Wine) {
    return this.oxCellarApiService.getImageSourceUrl(wine.id);
  }

  get wines(): Array<Wine> {
    return this._wines;
  }

  isActive(wine: Wine): boolean {
    let isActive = false;
    isActive = (this._selectedWine) && (wine.id === this._selectedWine.id);
    return isActive;
  }

}
