import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Wine } from './wine';
import { Injectable } from '@angular/core';
import { OxCellarApiService } from './ox-cellar-api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WineResolver implements Resolve<Wine> {
    constructor(
        private oxCellarApiService: OxCellarApiService
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Wine> | Promise<Wine> | Wine {
        return this.oxCellarApiService.get(route.params.id);
    }
}
