import {
    FILL_ELEVS_F, FILL_ELEVS_M
} from "./types";

const initialState = {elevsF: [], elevsM: []};

export const elevsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILL_ELEVS_F:
            return {
                elevsF: action.elevs
            }
        case FILL_ELEVS_M:
            return {
                elevsM: action.elevs
            }
            
        default:
            return state;
    }
}
