import * as React from 'react';
import '../arbeidsliste.less';
import { ReactComponent as ArbeidslisteikonBla } from '../arbeidslisteikon/arbeidslisteikon_bla.svg';
import { ReactComponent as ArbeidslisteikonRod } from '../arbeidslisteikon/arbeidslisteikon_rod.svg';
import { ReactComponent as ArbeidslisteikonGronn } from '../arbeidslisteikon/arbeidslisteikon_gronn.svg';
import { ReactComponent as ArbeidslisteikonGul } from '../arbeidslisteikon/arbeidslisteikon_gul.svg';
import { Field } from 'formik';
import ArbeidslisteIkon from './arbeidslisteikon';
import { FieldProps } from 'formik/dist/Field';
import { KategoriModell } from '../../../../types/arbeidsliste';

function ArbeidslisteKategori(props: { name: string }) {
    return (
        <Field name={props.name}>
            {({ field, form }: FieldProps<KategoriModell>) => {
                return (
                    <div className="arbeidslisteikon">
                        <span className="skjemaelement__label">Kategori</span>
                        <ArbeidslisteIkon
                            value={KategoriModell.BLA}
                            arbeidslisteikon={<ArbeidslisteikonBla />}
                            name={props.name}
                            onChange={() => form.setFieldValue(field.name, KategoriModell.BLA)}
                            checked={field.value === KategoriModell.BLA}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.ROD}
                            arbeidslisteikon={<ArbeidslisteikonRod />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.ROD)}
                            checked={field.value === KategoriModell.ROD}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.GRONN}
                            arbeidslisteikon={<ArbeidslisteikonGronn />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GRONN)}
                            checked={field.value === KategoriModell.GRONN}
                        />
                        <ArbeidslisteIkon
                            value={KategoriModell.GUL}
                            arbeidslisteikon={<ArbeidslisteikonGul />}
                            name={props.name}
                            onChange={() => form.setFieldValue(props.name, KategoriModell.GUL)}
                            checked={field.value === KategoriModell.GUL}
                        />
                    </div>
                );
            }}
        </Field>
    );
}

export default ArbeidslisteKategori;
