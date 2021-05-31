import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';

interface KvitteringProps {
    tittel: string;
    alertStripeTekst: string;
    footer?: React.ReactNode;
    onRequestClose?: () => void;
    kvitteringId?: string;
}

function Kvittering({ tittel, alertStripeTekst, footer, onRequestClose, kvitteringId }: KvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal
            isOpen={true}
            contentLabel="Operasjon fullført"
            onRequestClose={() => {
                hideModal();
                if (onRequestClose) {
                    onRequestClose();
                }
            }}
            type="SUCCESS"
        >
            <div className="blokk-xs" data-testid={kvitteringId}>
                <Systemtittel className="modal-info-tekst__undertekst blokk-xs">{tittel}</Systemtittel>
                <Normaltekst className="blokk-xs">{alertStripeTekst}</Normaltekst>
                {!!footer && <div className="kvittering-footer">{footer}</div>}
            </div>
        </VarselModal>
    );
}

export default Kvittering;
