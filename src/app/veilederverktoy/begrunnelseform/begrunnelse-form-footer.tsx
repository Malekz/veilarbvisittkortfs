import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../store/navigation/actions';
import { connect } from 'react-redux';

interface OwnProps {
    spinner: boolean;
    disabled?: boolean;
}

interface DispatchProps {
    tilbake: () => void;
}

type BegrunnelseFooterProps = OwnProps & DispatchProps;

function BegrunnelseFooter(props: BegrunnelseFooterProps) {
    return (
        <div className="modal-footer">
            <Hovedknapp
                htmlType="submit"
                spinner={props.spinner}
                autoDisableVedSpinner={true}
                className="btn--mr1"
                disabled={props.disabled}
            >
                Bekreft
            </Hovedknapp>
            <Knapp onClick={props.tilbake}>Avbryt</Knapp>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    tilbake: () => dispatch(navigerAction(null)),
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(BegrunnelseFooter);
