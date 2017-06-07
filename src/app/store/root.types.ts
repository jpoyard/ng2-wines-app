import { IWinesList } from '../wine/wines.types';

export interface IAppState {
  wines?: IWinesList;
  routes?: any;
}
