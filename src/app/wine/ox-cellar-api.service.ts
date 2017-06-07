import { Injectable } from '@angular/core';
import { MdDialogModule, MdDialog, MdDialogRef } from '@angular/material';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

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
  private _dialogRef: MdDialogRef<OxLoadingComponent>;
  public removed$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  public updated$: BehaviorSubject<Wine> = new BehaviorSubject<Wine>(null);
  public created$: BehaviorSubject<Wine> = new BehaviorSubject<Wine>(null);

  constructor(
    private http: Http,
    private logger: Logger,
    public dialog: MdDialog
  ) { }

  private openDialog() {
    this._dialogRef = this.dialog.open(OxLoadingComponent, {
      height: '150px',
      width: '150px',
    });
  }

  private closeDialog() {
    this._dialogRef.close();
  }

  getWines(): Promise<Wine[]> {
    this.openDialog();
    return this.http.get(this.winesUrl)
      .toPromise()
      .then(response => {
        // response.totalCount: number,
        // incompleteResults: boolean,
        // items: Array<Wine>
        this.closeDialog();
        return response.json().items as Wine[];
      })
      .catch(this.handleError);
  }

  getImageSourceUrl(wineId: number): string {
    return `${this.winesUrl}/${wineId}/picture`;
  }

  /**
   * query on server
   */
  public query(filterParams?: Array<string>, sortParams?: string, skipValue?: number, limitValue?: number): Promise<WinesQueryResponse> {
    const options: RequestOptionsArgs = {};

    this.openDialog();

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

      this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_FILTER}=${options.params[PARAM_NAME_FILTER]}`);
    }

    if (sortParams) {
      options.params[PARAM_NAME_SORT] = sortParams;
      this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_SORT}=${options.params[PARAM_NAME_SORT]}`);
    }

    if (skipValue) {
      options.params[PARAM_NAME_SKIP] = skipValue;
      this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_SKIP}=${skipValue}`);
    }

    if (limitValue) {
      options.params[PARAM_NAME_LIMIT] = limitValue;
      this.logger.log(`WineManagerServiceImpl : ${PARAM_NAME_LIMIT}=${limitValue}`);
    }

    return this.http.get(this.winesUrl, options)
      .toPromise()
      .then(response => {
        this.closeDialog();
        return response.json() as WinesQueryResponse;
      })
      .catch(this.handleError);
  };

  public get(wineId: number): Promise<Wine> {
    this.openDialog();
    return this.http.get(`${this.winesUrl}/${wineId}`)
      .toPromise()
      .then(response => {
        this.closeDialog();
        return response.json() as Wine;
      })
      .catch(this.handleError);
  };

  public update(wine: Wine): Promise<Wine> {
    this.openDialog();
    return this.http.put(`${this.winesUrl}/${wine.id}`, wine)
      .toPromise()
      .then(response => {
        this.updated$.next(wine);
        this.closeDialog();
        return response.json() as Wine;
      })
      .catch(this.handleError);
  };

  public save(wine: Wine): Promise<Wine> {
    this.openDialog();
    return this.http.post(this.winesUrl, wine)
      .toPromise()
      .then(response => {
        this.created$.next(wine);
        this.closeDialog();
        return response.json() as Wine;
      })
      .catch(this.handleError);
  };

  public delete(wine: Wine): Promise<boolean> {
    this.openDialog();
    return this.http.delete(`${this.winesUrl}/${wine.id}`)
      .toPromise()
      .then(response => {
        this.removed$.next(wine.id);
        this.closeDialog();
        return true;
      })
      .catch(this.handleError);
  };

  private handleError(error: any): Promise<any> {
    this.closeDialog();
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
