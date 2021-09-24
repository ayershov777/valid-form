import React, { useState } from 'react';
import { Field, formContext } from '../../contexts/FormContext';

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;


export default function Form(props: FormProps) {

    const [fields, setFields] = useState<Record<string, Field>>({});

    return (
        <formContext.Provider value={{ fields, setFields }}>
            <form {...props} />
        </formContext.Provider>
    );
}
