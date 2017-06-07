import { WinesActions } from './wines.actions';
import { IWinesList } from './wines.types';
import { Action } from 'redux';
import { Wine } from './wine';

export interface IPayloadAction<P, M> extends Action {
    payload?: P;
    error?: any;
    meta?: M;
}

const INITIAL_STATE: IWinesList = {
    items: [],
    selected: null,
    loading: false,
    error: null,
};

/**
 * create wine reducer
 */
export function createWinesReducer() {
    return function wineReducer(
        state: IWinesList = INITIAL_STATE,
        action: IPayloadAction<IWinesList, any>
    ): IWinesList {
        switch (action.type) {
            case WinesActions.SELECT_WINE_STARTED:
                return {
                    items: [...state.items],
                    loading: true,
                    error: null,
                    selected: null
                };
            case WinesActions.SELECT_WINE_SUCCEEDED:
                return {
                    items: [...state.items],
                    loading: false,
                    error: null,
                    selected: action.payload.selected
                };
            case WinesActions.DELETE_WINE_STARTED:
                return {
                    items: [...state.items],
                    loading: true,
                    error: null,
                    selected: state.selected
                };
            case WinesActions.DELETE_WINE_SUCCEEDED:
                return {
                    items: state.items.filter(wine => wine.id !== state.selected.id),
                    loading: false,
                    error: null,
                    selected: null
                };
            case WinesActions.UPDATE_WINE_STARTED:
                return {
                    items: [...state.items],
                    loading: true,
                    error: null,
                    selected: action.payload.selected
                };
            case WinesActions.UPDATE_WINE_SUCCEEDED:
                const items = [...state.items];
                if (action.payload.selected) {
                    const index = state.items.findIndex(wine => wine.id === action.payload.selected.id);
                    if (index > -1) {
                        items[index] = action.payload.selected;
                    }
                }
                return {
                    items: items,
                    loading: false,
                    error: null,
                    selected: action.payload.selected
                };
            case WinesActions.WINES_LOAD_STARTED:
                return {
                    items: new Array<Wine>(),
                    loading: true,
                    error: null,
                    selected: state.selected
                };
            case WinesActions.WINES_LOAD_SUCCEEDED:
                let selected: Wine = null;
                if (state.selected) {
                    selected = action.payload.items.find(wine => wine.id === state.selected.id);
                }
                return {
                    items: [...action.payload.items],
                    loading: false,
                    error: null,
                    selected: selected
                };
            case WinesActions.WINES_LOAD_FAILED:
                return {
                    items: new Array<Wine>(),
                    loading: false,
                    error: action.error,
                    selected: null
                };
        }

        return state;
    };
}
