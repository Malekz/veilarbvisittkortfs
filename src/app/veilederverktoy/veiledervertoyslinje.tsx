import React, {useEffect, useState} from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from './arbeidsliste/arbeidsliste-controller';
import TildelVeileder from './tildel-veileder/tildel-veileder';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import VeilederVerktoyNavigation from './veilederverktoy/veilederverktoy-navigation';
import VeilederVerktoyKnapp from './veilederverktoy/veileder-verktoy-knapp';
import {navigerTilProcesser} from '../../store/navigation/actions';
import FeatureApi from '../../api/feature-api';
import Toasts from '../components/toast/toasts';
import {Appstate} from "../../types/appstate";
import {FeilModal} from "../components/feilmodal/feil-modal";
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';

interface OwnProps {
    fnr: string;
    visVeilederVerktoy?: boolean;
}

interface DispatchProps {
    navigerTilProsesser: () => void;
}

interface StateProps {
    harFeilendeTildelinger: boolean
}

type VeilederverktoyslinjeProps = StateProps & OwnProps & DispatchProps;

function Veilederverktoyslinje({harFeilendeTildelinger, fnr, visVeilederVerktoy, navigerTilProsesser}: VeilederverktoyslinjeProps) {
    const [fjernToastFeature, setFjernToastFeature] = useState(false);

    const [visTildelingFeiletModal, setVisTildelingFeiletModal] = useState(harFeilendeTildelinger);

    const lukkModal = () => {
        setVisTildelingFeiletModal(false);
    }

    const FeilTildelingModal = () => {

        return (
            <FeilModal
                isOpen={visTildelingFeiletModal}
                contentLabel="Tildeling av veileder feilet"
                closeButton={false}
                onRequestClose={() => setVisTildelingFeiletModal(false)}
            >
                <Innholdstittel>Handlingen kan ikke utføres</Innholdstittel>
                <Normaltekst>Tildeling av veileder feilet</Normaltekst>
                <br/>
                <button className="knapp knapp--hoved" onClick={lukkModal}>
                    Ok
                </button>
            </FeilModal>
        );
    }

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvisittkortfs.fjerntoast')
            .then(resp => setFjernToastFeature(resp['veilarbvisittkortfs.fjerntoast']));
    }, []);

    useEffect(() => {
        setVisTildelingFeiletModal(harFeilendeTildelinger)
    }, [harFeilendeTildelinger]);

    if (!visVeilederVerktoy) {
        return null;
    }

    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <FeilTildelingModal/>
                <Arbeidslistekomponent fjernToastFeature={fjernToastFeature}/>
                <TildelVeileder fnr={fnr}/>
                <VeilederVerktoyKnapp
                    onClick={navigerTilProsesser}
                />
                <VeilederVerktoyNavigation/>
            </div>
            <Toasts/>
        </div>
    );
}

const mapStateToProps = (state: Appstate) => ({
    harFeilendeTildelinger: state.tildelVeileder.status === 'ERROR'
});


const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    navigerTilProsesser: () => dispatch(navigerTilProcesser())
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Veilederverktoyslinje);
