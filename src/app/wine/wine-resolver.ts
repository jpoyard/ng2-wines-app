import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Wine } from './wine';
import { Injectable } from '@angular/core';
import { OxCellarApiService } from './ox-cellar-api.service';
import { Observable } from 'rxjs/Observable';
import { Logger } from 'angular2-logger/core';

@Injectable()
export class WineResolver implements Resolve<Wine> {
    constructor(
        private logger: Logger,
        private oxCellarApiService: OxCellarApiService
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Wine> | Promise<Wine> | Wine {
        return this.oxCellarApiService.get(route.params.id);
    }
}
