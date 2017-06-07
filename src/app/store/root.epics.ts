import { Injectable } from '@angular/core';
import { combineEpics, EpicMiddleware } from 'redux-observable';

import { WinesEpics } from '../wine/wines.epics';

@Injectable()
export class RootEpics {
  constructor(private wineEpics: WinesEpics) {}

  public createEpics(): EpicMiddleware<any, any>[] {
    return [
      ...this.wineEpics.createEpics(),
    ];
  }
}
