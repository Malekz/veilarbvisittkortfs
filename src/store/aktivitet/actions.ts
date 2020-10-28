export enum AktivitetType {
    HENT_HAR_TILTAK = 'HENT_HAR_TILTAK',
    HENT_HAR_TILTAK_SUCCESS = 'HENT_HAR_TILTAK_SUCCESS',
    HENT_HAR_TILTAK_ERROR = 'HENT_HAR_TILTAK_ERROR',
}

export interface HentHarTiltakAction {
    type: AktivitetType.HENT_HAR_TILTAK;
}

export interface HentHarTiltakActionSuccess {
    type: AktivitetType.HENT_HAR_TILTAK_SUCCESS;
    harTiltak: boolean;
}

export interface HentHarTiltakActionError {
    type: AktivitetType.HENT_HAR_TILTAK_ERROR;
    error: Error;
}

export const hentHarTiltak = (): HentHarTiltakAction => ({
    type: AktivitetType.HENT_HAR_TILTAK,
});

export const hentHarTiltakSuccess = (harTiltak: boolean): HentHarTiltakActionSuccess => ({
    type: AktivitetType.HENT_HAR_TILTAK_SUCCESS,
    harTiltak,
});

export const hentHarTiltakError = (error: Error): HentHarTiltakActionError => ({
    type: AktivitetType.HENT_HAR_TILTAK_ERROR,
    error,
});

export type AktivitetActions = HentHarTiltakAction | HentHarTiltakActionSuccess | HentHarTiltakActionError;
