import { Wine } from './wine';

export interface IWinesList {
    items: Wine[];
    selected: Wine;
    loading: boolean;
    error: any;
}
