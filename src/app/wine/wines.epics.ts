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
            createEpicMiddleware(this.createSelectWineEpic()),
            createEpicMiddleware(this.createDeleteWineEpic()),
            createEpicMiddleware(this.createUpdateWineEpic())
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

    private createSelectWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.SELECT_WINE_STARTED)
                .switchMap(a =>
                    Observable.fromPromise(
                        this.router.navigate([a.payload.selected.id, 'view'], { relativeTo: a.meta.route })
                    ).map(data => this.actions.selectWineSucceeded(a.payload.selected))
                );
    }

    private createDeleteWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.DELETE_WINE_STARTED)
                .switchMap(a => this.service.delete(a.payload.selected)
                    .map(data => {
                        this.router.navigate(['wines']);
                        return this.actions.deleteWineSucceeded(a.payload.selected);
                    })
                    .catch(response => of(this.actions.loadFailed({
                        status: '' + response.status,
                    }))));
    }

    private createUpdateWineEpic() {
        return (action$: ActionsObservable<any>) =>
            action$
                .ofType(WinesActions.UPDATE_WINE_STARTED)
                .switchMap(a => this.service.update(a.payload.selected)
                    .map(data => {
                        this.router.navigate(['wines', a.payload.selected.id, 'view']);
                        return this.actions.updateWineSucceeded(a.payload.selected);
                    })
                    .catch(response => of(this.actions.loadFailed({
                        status: '' + response.status,
                    }))));
    }
}
