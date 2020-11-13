import { fetchToJson, postAsJson } from './api-utils';
import { VeilederListe } from './data/veilederdata';
import { BehandlandeEnhet, OppgaveFormData, OppgaveFormResponse, OppgaveTema } from './data/oppgave';

export interface OppgaveApi {
    hentBehandlandeEnheter: (tema: OppgaveTema, fnr: string) => Promise<BehandlandeEnhet[]>;
    hentOppgaveHistorikk: (fnr: string) => string;
    lagreOppgave: (fnr: string, oppgaveFormData: OppgaveFormData) => Promise<OppgaveFormResponse>;
    hentOppgaveVeileder: (fnr: string, enhetsId: string) => Promise<VeilederListe>;
}

const OPPGAVE_BASE_URL = '/veilarboppgave/api';

function hentBehandlandeEnheter(tema: OppgaveTema, fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enheter?tema=${tema}&fnr=${fnr}`);
}

function hentOppgaveHistorikk(fnr: string) {
    return `${OPPGAVE_BASE_URL}/oppgavehistorikk?fnr=${fnr}`;
}

function hentOppgaveVeileder(fnr: string, enhetsId: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enhet/${enhetsId}/veiledere?fnr=${fnr}`);
}

function lagreOppgave(fnr: string, oppgaveFormData: OppgaveFormData) {
    return postAsJson(`${OPPGAVE_BASE_URL}/oppgave?fnr=${fnr}`, oppgaveFormData);
}

export default {
    hentBehandlandeEnheter,
    hentOppgaveHistorikk,
    hentOppgaveVeileder,
    lagreOppgave,
} as OppgaveApi;
