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

  static readonly LOAD_FAILED = 'LOAD_FAILED';

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
      type: WinesActions.LOAD_FAILED,
      meta: {},
      payload: {},
      error,
    };
  }

  selectWine(route: ActivatedRoute, wine: Wine): any {
    return {
      type: WinesActions.SELECT_WINE_STARTED,
      meta: {
        route: route,
      },
      payload: {
        selected: wine
      }
    };
  }

  selectWineSucceeded(wine: Wine): any {
    return {
      type: WinesActions.SELECT_WINE_SUCCEEDED,
      meta: {},
      payload: {
        selected: wine
      }
    };
  }

  deleteWine(route: ActivatedRoute, wine: Wine): any {
    return {
      type: WinesActions.DELETE_WINE_STARTED,
      meta: {
        route: route,
      },
      payload: {
        selected: wine
      }
    };
  }

  deleteWineSucceeded(wine: Wine): any {
    return {
      type: WinesActions.DELETE_WINE_SUCCEEDED,
      meta: {},
      payload: {
        selected: wine
      }
    };
  }
  updateWine(route: ActivatedRoute, wine: Wine): any {
    return {
      type: WinesActions.UPDATE_WINE_STARTED,
      meta: {
        route: route
      },
      payload: {
        selected: wine
      }
    };
  }

  updateWineSucceeded(wine: Wine): any {
    return {
      type: WinesActions.UPDATE_WINE_SUCCEEDED,
      meta: {},
      payload: {
        selected: wine
      }
    };
  }
}
