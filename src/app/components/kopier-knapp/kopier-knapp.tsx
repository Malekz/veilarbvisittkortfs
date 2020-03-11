import * as React from 'react';
import KnappFss from '../knapp-fss/knapp-fss';
import './kopier-knapp.less';
import { useState } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import { logEvent } from '../../utils/frontend-logger';

export function KopierKnappTekst(props: { kopierTekst: string }) {
    const [copySuccess, setCopySuccess] = useState(false);

    function copyToClipboard() {
        logEvent('veilarbvisittkortfs.metrikker.kopier.fnr');
        const textField = window.document.createElement('textarea');
        textField.innerText = props.kopierTekst;
        window.document.body.appendChild(textField);
        textField.select();
        window.document.execCommand('copy');
        textField.remove();
        setCopySuccess(true);
    }

    useEffect(() => {
        let timeOutId = 0;
        if (copySuccess) {
            timeOutId = window.setTimeout(() => setCopySuccess(false), 1000);
        }
        return () => clearTimeout(timeOutId);
    }, [copySuccess]);

    return (
        <KnappFss className="kopier-knapp" onClick={copyToClipboard}>
            {props.kopierTekst}
            <span className={classNames('kopier-knapp__tooltip', { 'tooltip--visible': copySuccess })}>
                Kopiert fødselsnummer
            </span>
        </KnappFss>
    );
}
