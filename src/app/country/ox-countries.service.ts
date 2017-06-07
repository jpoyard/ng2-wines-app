import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Country } from './country';

const PARAM_QUERY = 'q';

@Injectable()
export class OxCountriesService {
  private countriesUrl = 'api/countries';

  constructor(
    private http: Http
  ) {
  }

  /**
   * query for countries
   * @param {string} lang
   * @param {string} query
   * @returns {Promise<Array<Country>>}
   */
  public query(lang: string, query: string): Promise<Array<Country>> {
    const params = {};
    if (lang && query) {
      params[PARAM_QUERY] = lang + ':' + query;
    }

    return this.http.get(this.countriesUrl, { params: params })
      .toPromise()
      .then(response => {
        return response.json() as Array<Country>;
      })
      .catch(this.handleError);
  }

  /**
   * get all countries
   * @returns {Promise<Array<Country>>}
   */
  public getAll(): Promise<Array<Country>> {
    return this.http.get(this.countriesUrl)
      .toPromise()
      .then(response => {
        return response.json() as Array<Country>;
      })
      .catch(this.handleError);
  }

  /**
   * get country associated to giving country code (3 characters) 
   * @param {string} code
   * @returns {Promise<Country>}
   */
  get(code: string): Promise<Country> {
    return this.http.get(`${this.countriesUrl}/${code}`)
      .toPromise()
      .then(response => {
        return response.json() as Country;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
