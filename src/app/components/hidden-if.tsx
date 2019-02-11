import * as React from 'react';

export interface HiddenProps {
    hidden?: boolean;
}

export default function hiddenIf<PROPS>(Component: React.ComponentType<PROPS>): React.ComponentType<PROPS & HiddenProps> {
    return (props: PROPS & HiddenProps) => {
        const { hidden, ...rest } = props as any; // tslint:disable-line
        if (hidden) {
            return null;
        }
        return <Component {...rest} />;
    };
}