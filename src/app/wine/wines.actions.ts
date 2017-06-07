import { select } from '@angular-redux/store/lib/src/decorators/select';
import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { ActivatedRoute } from '@angular/router';

import { WinesQueryResponse } from './ox-cellar-api.service';
import { Wine } from './wine';

@Injectable()
export class WinesActions {
  static readonly WINES_LOAD_STARTED = 'WINES_LOAD_STARTED';
  static readonly WINES_LOAD_SUCCEEDED = 'WINES_LOAD_SUCCEEDED';
  static readonly SELECT_WINE_STARTED = 'SELECT_WINE_STARTED';
  static readonly SELECT_WINE_SUCCEEDED = 'SELECT_WINE_SUCCEEDED';
  static readonly DELETE_WINE_STARTED = 'DELETE_WINE_STARTED';
  static readonly DELETE_WINE_SUCCEEDED = 'DELETE_WINE_SUCCEEDED';
  static readonly UPDATE_WINE_STARTED = 'UPDATE_WINE_STARTED';
  static readonly UPDATE_WINE_SUCCEEDED = 'UPDATE_WINE_SUCCEEDED';

  static readonly WINES_LOAD_FAILED = 'WINES_LOAD_FAILED';

  loadWines(filters: Array<string>, sorting: string): any {
    return {
      type: WinesActions.WINES_LOAD_STARTED,
      meta: {
        filters: filters,
        sorting: sorting
      }
    };
  }

  loadSucceeded(payload: WinesQueryResponse): any {
    return {
      type: WinesActions.WINES_LOAD_SUCCEEDED,
      meta: {},
      payload: {
        items: payload.items
      },
    };
  }

  loadFailed(error): any {
    return {
      type: WinesActions.WINES_LOAD_FAILED,
      meta: {},
      error,
    };
  }

  // TODO - 1 - select Wine - selectWine(route: ActivatedRoute, wine: Wine): any

  // TODO - 1 - select Wine - selectWineSucceeded(wine: Wine): any

  // TODO - 2 - delete Wine - deleteWine(route: ActivatedRoute, wine: Wine): any

  // TODO - 2 - delete Wine - deleteWineSucceeded(wine: Wine): any

  // TODO - 3 - update Wine - updateWine(route: ActivatedRoute, wine: Wine)

  // TODO - 3 - update Wine - updateWineSucceeded(wine: Wine): any

}
