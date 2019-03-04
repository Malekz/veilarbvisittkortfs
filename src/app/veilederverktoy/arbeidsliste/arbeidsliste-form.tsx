import React from 'react';
import './arbeidsliste.less';
import FormikInput from '../../components/formik/formik-inputs';
import FormikTekstArea from '../../components/formik/formik-textarea';
import FormikDatoVelger from '../../components/formik/formik-datepicker';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';
import { Undertekst } from 'nav-frontend-typografi';
import { Form } from 'formik';

interface ArbeidslisteFormProps {
    onRequestClose: () => void;
    laster: boolean;
    sistEndretAv?: string;
    sistEndretDato?: Date;

}

function ArbeidslisteForm (props: ArbeidslisteFormProps) {
    return (
        <Form>
            <div className="nav-input blokk-s">
                <FormikInput name="overskrift"/>
                <FormikTekstArea name="kommentar"/>
            </div>
            {props.sistEndretDato && <Undertekst className="arbeidsliste--modal-redigering">
                <FormattedMessage
                    id="arbeidsliste.kommentar.footer"
                    values={{
                        dato: props.sistEndretDato.toLocaleDateString(),
                        veileder: props.sistEndretAv
                    }}
                />
            </Undertekst>}
            <FormikDatoVelger name="frist"/>
            <div>
                <div className="modal-footer">
                    <Hovedknapp htmlType="submit" className="knapp knapp--hoved" spinner={props.laster}>
                        <FormattedMessage id="modal.knapp.lagre" />
                    </Hovedknapp>
                    <button type="button" className="knapp" onClick={props.onRequestClose}>
                        <FormattedMessage id="modal.knapp.avbryt" />
                    </button>
                </div>
            </div>
        </Form>
    );
}

export default ArbeidslisteForm;