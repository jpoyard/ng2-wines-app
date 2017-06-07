import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { Wine } from './wine';

import { OxLoadingComponent } from '../ox-loading/ox-loading.component';

const PARAM_NAME_SKIP = 'skip';
const PARAM_NAME_LIMIT = 'limit';
const PARAM_NAME_SORT = 'sort';
const PARAM_NAME_FILTER = 'q';

export class WinesQueryResponse {
  totalCount: number;
  incompleteResults: boolean;
  items: Array<Wine>;
}

@Injectable()
export class OxCellarApiService {
  private winesUrl = 'api/wines';

  constructor(
    private http: Http
  ) { }

  getImageSourceUrl(wineId: number): string {
    return `${this.winesUrl}/${wineId}/picture`;
  }
  /**
   * query on server
   */
  public query(filterParams?: Array<string>, sortParams?: string, skipValue?: number, limitValue?: number): Observable<WinesQueryResponse> {
    const options: RequestOptionsArgs = {};

    options.params = {};

    if (filterParams && (filterParams.length > 0)) {
      let filterForQuery = '';
      filterParams.forEach(filter => {
        if (filterForQuery.length > 0) {
          filterForQuery += '+';
        }
        filterForQuery += filter;
      });

      options.params[PARAM_NAME_FILTER] = filterForQuery;
    }

    if (sortParams) {
      options.params[PARAM_NAME_SORT] = sortParams;
    }

    if (skipValue) {
      options.params[PARAM_NAME_SKIP] = skipValue;
    }

    if (limitValue) {
      options.params[PARAM_NAME_LIMIT] = limitValue;
    }

    return this.http.get(this.winesUrl, options)
      .map(resp => resp.json() as WinesQueryResponse);
  };

  public get(wineId: number): Observable<Wine> {
    return this.http.get(`${this.winesUrl}/${wineId}`)
      .map(response => response.json() as Wine);
  };

  public update(wine: Wine): Observable<Wine> {
    return this.http.put(`${this.winesUrl}/${wine.id}`, wine)
      .map(response => response.json() as Wine);
  };

  public save(wine: Wine): Observable<Wine> {
    return this.http.post(this.winesUrl, wine)
      .map(response => response.json() as Wine);
  };

  public delete(wine: Wine): Observable<Wine> {
    return this.http.delete(`${this.winesUrl}/${wine.id}`)
      .map(response => wine);
  };
}
