import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Country } from './country';
import { Injectable } from '@angular/core';
import { OxCountriesService } from './ox-countries.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountriesResolver implements Resolve<Country[]> {
    constructor(
        private oxCountriesService: OxCountriesService
    ) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Country[]> | Promise<Country[]> | Country[] {
        return this.oxCountriesService.getAll();
    }
}
