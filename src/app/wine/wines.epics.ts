import { Injectable } from '@angular/core';
import { Epic, EpicMiddleware, createEpicMiddleware, ActionsObservable } from 'redux-observable';
import { Action, Store } from 'redux';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { WinesActions } from './wines.actions';
import { OxCellarApiService } from './ox-cellar-api.service';
import { Router } from '@angular/router';

@Injectable()
export class WinesEpics {
    constructor(
        private service: OxCellarApiService,
        private actions: WinesActions,
        private router: Router
    ) { }

    public createEpics(): EpicMiddleware<any, any>[] {
        return [
            createEpicMiddleware(this.createLoadWineEpic()),
            // TODO - 1 - select Wine
            //     createEpicMiddleware(this.createSelectWineEpic()),
            // TODO - 2 - delete Wine
            //     createEpicMiddleware(this.createDeleteWineEpic()),
            // TODO - 3 - update Wine
            //     createEpicMiddleware(this.createUpdateWineEpic())
        ];
    }

    private createLoadWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.WINES_LOAD_STARTED)
                .switchMap(a => this.service.query(a.meta.filters, a.meta.sorting)
                    .map(data => this.actions.loadSucceeded(data))
                    .catch(response => of(this.actions.loadFailed({
                        status: '' + response.status,
                    }))));
    }

    // TODO - 1 - select Wine
    /*
    private createSelectWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.SELECT_WINE_STARTED)
                .XXX;
    }
    */

    // TODO - 2 - delete Wine
    /*
    private createDeleteWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.DELETE_WINE_STARTED)
                .XXX;
    }
    */

    /*
    private createUpdateWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.UPDATE_WINE_STARTED)
                .XXX;
    }
    */
}
