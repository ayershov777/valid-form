import React, { useState } from 'react';
import { Field, formContext } from '../../contexts/FormContext';

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default function Form(props: FormProps) {

    const [fields, setFields] = useState<Record<string, Field>>({});

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const valid = Object.entries(fields).reduce((acc, [fieldName, field]) => {
            const feedback = field.validate(field.value, fields);
            fields[fieldName] = { ...field, feedback };
            setFields({ ...fields });
            return acc && ("valid" === feedback);
        }, true);

        if (valid) {
            // make network request
            
        }

        // if(props.onSubmit) {
        //     props.onSubmit(e);
        // }
    }

    return (
        <formContext.Provider value={{ fields, setFields }}>
            <form {...props} onSubmit={onSubmit} />
        </formContext.Provider>
    );
}
