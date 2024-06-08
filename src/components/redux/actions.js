import {
    FILL_ELEVS_F, FILL_ELEVS_M
} from "./types";

export function fillElevsF(elevs) {
    return {
        type: FILL_ELEVS_F,
        elevs,
    }
}
export function fillElevsM(elevs) {
    return {
        type: FILL_ELEVS_M,
        elevs,
    }
}
