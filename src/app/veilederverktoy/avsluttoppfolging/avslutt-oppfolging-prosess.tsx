import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface AvsluttOppfolgingProsessProps {
    navigerTilAvsluttOppfolging: () => void;
}

function AvsluttOppfolgingProsess(props: AvsluttOppfolgingProsessProps) {
    return (
        <StartProsess
            knappeTekst="Avslutt oppfølging"
            onClick={props.navigerTilAvsluttOppfolging}
            metricName="avslutt_oppfolging"
        />
    );
}
export default AvsluttOppfolgingProsess;
