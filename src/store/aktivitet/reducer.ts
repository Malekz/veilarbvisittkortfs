import { Reducer } from 'redux';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FETCH_STATUS } from '../../types/fetch-status';
import { OrNothing } from '../../types/utils/ornothing';
import OppfolgingSelector from '../oppfolging/selector';
import { AktivitetActions, AktivitetType, hentHarTiltakError, hentHarTiltakSuccess } from './actions';
import AktivitetApi from '../../api/aktivitet-api';

export interface AktivitetData {
    harTiltak: boolean;
}

export type AktivitetState = { data: OrNothing<AktivitetData> } & {
    status: FETCH_STATUS;
    error: OrNothing<Error>;
};

const initialState: AktivitetState = {
    data: null,
    status: 'NOT_STARTED',
    error: null,
};

const aktivitetReducer: Reducer<AktivitetState, AktivitetActions> = (state = initialState, action) => {
    switch (action.type) {
        case AktivitetType.HENT_HAR_TILTAK: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case AktivitetType.HENT_HAR_TILTAK_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: { harTiltak: action.harTiltak },
            };
        }
        case AktivitetType.HENT_HAR_TILTAK_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error,
            };
        }
        default:
            return state;
    }
};

function* hentHarTiltak() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const harTiltak = yield call(() => AktivitetApi.hentHarTiltak(fnr));
        yield put(hentHarTiltakSuccess(harTiltak));
    } catch (e) {
        yield put(hentHarTiltakError(e));
    }
}

export function* hentHarTiltakSaga() {
    yield takeLatest(AktivitetType.HENT_HAR_TILTAK, hentHarTiltak);
}

export default aktivitetReducer;
