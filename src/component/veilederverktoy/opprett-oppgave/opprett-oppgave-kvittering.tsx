import React from 'react';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import Kvittering from '../prosess/kvittering';
import { OrNothing } from '../../../util/type/ornothing';
import { OppgaveTema, OppgaveType } from '../../../api/data/oppgave';

interface StateProps {
    tema: OrNothing<OppgaveTema>;
    type: OrNothing<OppgaveType>;
}

type StartOppfolgingKvittering = StateProps;

function OpprettOppgaveKvittering({ tema, type }: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittel="Opprett en Gosys-oppgave"
            alertStripeTekst={`Oppgave med tema ${tema} av type ${type} er opprettet.`}
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    tema: state.oppgavehistorikk.data.lagetOppgave && state.oppgavehistorikk.data.lagetOppgave.tema,
    type: state.oppgavehistorikk.data.lagetOppgave && state.oppgavehistorikk.data.lagetOppgave.type,
});

export default connect<StateProps>(mapStateToProps)(OpprettOppgaveKvittering);
