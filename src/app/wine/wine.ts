export class Wine {
  /**
   * {number}
   * should be the unique identifier
   */
  id: number;
  /**
   * {string}
   * wine name
   */
  name: string;
  /**
   * {string}
   * year of production of this wine
   */
  year: number;
  /**
   * {string}
   * grapes name
   */
  grapes: string;
  /**
   * {string}
   * native country
   */
  country: string;
  /**
   * {string}
   * native region
   */
  region: string;
  /**
   * {string}
   * full description
   */
  description: string;
  /**
   * {string}
   * picture name
   */
  picture: string;
  /**
   * {number}
   * rating 0 to 5
   */
  rating: number;
  /**
   * {number}
   * price
   */
  price: number;
  /**
    * {number}
    * ratio rating / price
    */
  goodDealRatio: number;
}