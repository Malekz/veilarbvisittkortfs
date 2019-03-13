import {InnstillingsHistorikk} from "../../../../types/innstillings-historikk";
import {OppgaveHistorikk} from "../../../../types/oppgave-historikk";
import moment from "moment";
import OppgaveHistorikkKomponent from "./components/oppgavehistorikk";
import InnstillingsHistorikkKomponent from "./components/instillingshistorikk";
import React from "react";
import {Normaltekst} from "nav-frontend-typografi";
import Lesmerpanel from 'nav-frontend-lesmerpanel';

interface OwnProps {
    historikkInnslag : (InnstillingsHistorikk | OppgaveHistorikk)[];
}


function HistorikkVisning ({historikkInnslag}:OwnProps) {

    const mapTilOppgaveEllerInnstillinger = (historikkElem: (InnstillingsHistorikk | OppgaveHistorikk)) =>
        historikkElem.type === 'OPPRETTET_OPPGAVE' ?
            <OppgaveHistorikkKomponent oppgaveHistorikk={historikkElem} key={historikkElem.dato}/>
            : <InnstillingsHistorikkKomponent instillingsHistorikk={historikkElem} key={historikkElem.dato}/>;


    if(historikkInnslag.length == 0){

               return <Normaltekst> Ingen historikk</Normaltekst>
    }

    if(historikkInnslag.length == 1) {
        return (

                mapTilOppgaveEllerInnstillinger(historikkInnslag[0])
        )
    }
    const sortertEtterDatoHistorikkInnslag= historikkInnslag.sort((a,b) => moment(b.dato).diff(a.dato));

    const historikkKomponenter =
        sortertEtterDatoHistorikkInnslag
            .map((elem:(InnstillingsHistorikk | OppgaveHistorikk)) =>
                mapTilOppgaveEllerInnstillinger(elem));

    const [forstaHistorikkElemenetet, ...rest] = historikkKomponenter;


    return(
        <Lesmerpanel
            intro={forstaHistorikkElemenetet}
            apneTekst="Vis mer"
            className=""
            lukkTekst="Vis mindre"
        >
            {rest}
        </Lesmerpanel>
    )
}

export default HistorikkVisning;