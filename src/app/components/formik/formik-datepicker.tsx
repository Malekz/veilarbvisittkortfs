import React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { Datovelger } from 'nav-datovelger';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import './datovelger.less';
import classNames from 'classnames';

interface FormikDatepickerProps {
    name: string;
    validate: (value: string) => string | undefined;
    label: string;
    ariaLabel: string;
    className?: string;
}

function FormikDatoVelger({ name, validate, label, ariaLabel, className }: FormikDatepickerProps) {
    return (
        <Field validate={validate} name={name} id={name}>
            {({ field, form: { errors, setFieldValue } }: FieldProps) => {
                const error = getIn(errors, name);
                const datePickerClassName = classNames('skjemaelement datovelger', className, {
                    'datovelger--harFeil': error,
                });
                return (
                    <div className={datePickerClassName}>
                        <span className="skjemaelement__label">{label}</span>
                        <Datovelger
                            input={{
                                id: name,
                                name,
                                placeholder: 'dd.mm.åååå',
                                ariaLabel,
                            }}
                            id="fristDatovelger"
                            onChange={(date: string) => setFieldValue(field.name, date)}
                            valgtDato={field.value}
                        />
                        {error && <SkjemaelementFeilmelding>{error}</SkjemaelementFeilmelding>}
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikDatoVelger;
