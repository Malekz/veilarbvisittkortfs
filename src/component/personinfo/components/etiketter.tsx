import React, { useEffect, useState } from 'react';
import EtikettBase, { EtikettInfo, EtikettAdvarsel, EtikettFokus } from 'nav-frontend-etiketter';
import { useDataStore } from '../../../store/data-store';
import { useAppStore } from '../../../store/app-store';
import './etiketter.less';
import { OrNothing } from '../../../util/type/ornothing';
import { fetchRegistrering, InnsatsgruppeType } from '../../../api/veilarbperson';
import { HENT_PERSONDATA_FRA_PDL_TOGGLE, PILOT_TOGGLE } from '../../../api/veilarbpersonflatefs';
import { OppfolgingStatus } from '../../../api/veilarboppfolging';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { ifResponseHasData, isEmpty } from '../../../util/utils';
import visibleIf from '../../components/visible-if';
import Show from '../../components/show/show';

const Advarsel = visibleIf(EtikettAdvarsel);
const Info = visibleIf(EtikettInfo);
const Fokus = visibleIf(EtikettFokus);
const Base = visibleIf(EtikettBase);

function erBrukerSykmeldt(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe === 'IARBS' && oppfolging.servicegruppe === 'VURDI';
}

function trengerVurdering(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'IVURD';
}

function trengerAEV(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return !!oppfolging && oppfolging.formidlingsgruppe !== 'ISERV' && oppfolging.servicegruppe === 'BKART';
}

function manglerVedtak(oppfolging: OrNothing<OppfolgingStatus>): boolean {
    return (
        !!oppfolging &&
        oppfolging.formidlingsgruppe !== 'ISERV' &&
        (oppfolging.servicegruppe === 'BKART' || oppfolging.servicegruppe === 'IVURD')
    );
}

function Etiketter() {
    const { brukerFnr } = useAppStore();
    const { oppfolgingsstatus, oppfolging, personalia, features, vergeOgFullmakt, spraakTolk } = useDataStore();

    const [innsatsgruppe, setInnsatsgruppe] = useState<OrNothing<InnsatsgruppeType>>(null);

    const registreringFetcher = useAxiosFetcher(fetchRegistrering);

    useEffect(() => {
        if (brukerFnr && features[PILOT_TOGGLE]) {
            registreringFetcher.fetch(brukerFnr).then(
                ifResponseHasData((data) => {
                    setInnsatsgruppe(data.registrering.profilering?.innsatsgruppe);
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    return (
        <div className="etikett-container">
            <Base visible={personalia?.dodsdato} type="info" className="etikett--mork">
                Død
            </Base>
            <Advarsel visible={personalia?.diskresjonskode}>Kode {personalia?.diskresjonskode}</Advarsel>
            <Advarsel visible={personalia?.sikkerhetstiltak}>{personalia?.sikkerhetstiltak}</Advarsel>
            <Advarsel visible={personalia?.egenAnsatt}>Egen ansatt</Advarsel>
            <Show if={features[HENT_PERSONDATA_FRA_PDL_TOGGLE]}>
                <Fokus visible={!isEmpty(vergeOgFullmakt?.vergemaalEllerFremtidsfullmakt)}>Vergemål</Fokus>
                <Fokus visible={!isEmpty(vergeOgFullmakt?.fullmakt)}>Fullmakt</Fokus>
                <Fokus visible={spraakTolk?.tegnspraak}>Tegnspråktolk</Fokus>
                <Fokus visible={spraakTolk?.talespraak}>Språktolk</Fokus>
            </Show>
            <Fokus visible={oppfolging?.underKvp}>KVP</Fokus>
            <Fokus
                visible={oppfolging && oppfolging.manuell}
                title="Brukeren er vurdert til å ikke kunne benytte seg av aktivitetsplanen og dialogen. Du kan endre til digital oppfølging i Veilederverktøy dersom bruker ikke er reservert i KRR."
            >
                Manuell oppfølging
            </Fokus>
            <Fokus
                visible={oppfolging?.reservasjonKRR}
                title="Brukeren har reservert seg mot digital kommunikasjon i Kontakt- og reservasjonsregisteret, og kan derfor ikke benytte seg av aktivitetsplanen og dialogen."
            >
                Reservert KRR
            </Fokus>
            <Fokus visible={oppfolging?.inaktivIArena}>Inaktivert</Fokus>
            <Fokus visible={!oppfolging?.underOppfolging}>Ikke under oppfølging</Fokus>
            <Fokus visible={oppfolging?.gjeldendeEskaleringsvarsel}>Varsel</Fokus>
            <Fokus
                visible={!oppfolging?.reservasjonKRR && !oppfolging?.manuell && !oppfolging?.kanVarsles}
                title="Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret og kan ikke varsles. Du kan derfor ikke samhandle digitalt med brukeren. "
            >
                Ikke registrert KRR
            </Fokus>
            <Info visible={trengerVurdering(oppfolgingsstatus) && !innsatsgruppe}>Trenger vurdering</Info>
            <Info visible={trengerAEV(oppfolgingsstatus) && !innsatsgruppe}>Behov for AEV</Info>
            <Info visible={erBrukerSykmeldt(oppfolgingsstatus)}>Sykmeldt</Info>
            <Info visible={innsatsgruppe === 'STANDARD_INNSATS' && manglerVedtak(oppfolgingsstatus)}>
                Antatt gode muligheter
            </Info>
            <Info visible={innsatsgruppe === 'SITUASJONSBESTEMT_INNSATS' && manglerVedtak(oppfolgingsstatus)}>
                Antatt behov for veiledning
            </Info>
            <Info visible={innsatsgruppe === 'BEHOV_FOR_ARBEIDSEVNEVURDERING' && manglerVedtak(oppfolgingsstatus)}>
                Oppgitt hindringer
            </Info>
        </div>
    );
}
export default Etiketter;
