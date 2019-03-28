import React from 'react';
import hiddenIf from '../../components/hidden-if/hidden-if';
import EtikettBase, {EtikettInfo, EtikettAdvarsel, EtikettFokus} from 'nav-frontend-etiketter';
import { OppfolgingStatus } from '../../../types/oppfolging-status';
import { Personalia } from '../../../types/personalia';
import './etiketter.less';
import {Oppfolging} from "../../../types/oppfolging";

const Advarsel = hiddenIf(EtikettAdvarsel);
const Info = hiddenIf(EtikettInfo);
const Fokus = hiddenIf(EtikettFokus);
const Bas = hiddenIf(EtikettBase);

export function erBrukerSykmeldt(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

export function trengerVurdering(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}
export function trengerAEV(oppfolging: OppfolgingStatus): boolean {
    return oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function Etiketter(props: {personalia: Personalia, oppfolgingstatus: OppfolgingStatus, oppfolging: Oppfolging}) {
    const { diskresjonskode, sikkerhetstiltak, egenAnsatt, dodsdato } = props.personalia;
    const {underKvp, reservarsjonKRR, manuell, underOppfolging, inaktivtIArena, gjeldeneEskaleringsvarsel} = props.oppfolging;
    return(
        <div className="etikett-container">
            <Bas hidden={!dodsdato} type="info">Død</Bas>
            <Advarsel hidden={!diskresjonskode}>Kode {diskresjonskode}</Advarsel>
            <Advarsel hidden={!sikkerhetstiltak}>{sikkerhetstiltak}</Advarsel>
            <Advarsel hidden={!egenAnsatt}>Egen ansatt</Advarsel>
            <Fokus hidden={!underKvp}>KVP</Fokus>
            <Fokus hidden={!manuell}>Manuell bruker</Fokus>
            <Fokus hidden={!reservarsjonKRR}>KRR</Fokus>
            <Fokus hidden={!!inaktivtIArena}>Inaktivert</Fokus>
            <Fokus hidden={!underOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus hidden={!!gjeldeneEskaleringsvarsel}>Varsel</Fokus>
            <Info hidden={!(trengerVurdering(props.oppfolgingstatus))}>Trenger vurdering</Info>
            <Info hidden={!(trengerAEV(props.oppfolgingstatus))}>Behov for AEV</Info>
            <Info hidden={!erBrukerSykmeldt(props.oppfolgingstatus)}>Sykmeldt</Info>
        </div>
    );
}

export default Etiketter;
