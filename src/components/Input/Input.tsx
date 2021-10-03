import React, { useContext, useEffect } from 'react';
import { Field, Fields, formContext } from '../../contexts/FormContext';

export type Validator = (value: string, fields: Fields) => string;

type InputProps = 
    React.InputHTMLAttributes<HTMLInputElement> & {
        fieldName: string;
        validate: Validator;
        deps?: string[];
    };

export default function Input (props: InputProps) {
    const { fields, setFields } = useContext(formContext);

    // initialize field
    useEffect(() => {
        if(setFields) {
            const field: Field = {
                value: "",
                feedback: "",
                validate: props.validate,
            };

            setFields(fields => ({ ...fields, [props.fieldName]: field }));
        }
    }, []);

    // call onChange and onBlur
    function update(value: string) {
        if(props.validate && setFields) {
            fields[props.fieldName] = {
                ...fields[props.fieldName],
                feedback: props.validate(value, fields),
                value,
            };

            props.deps?.forEach(dep => {
                const dependent = fields[dep];
                const feedback = dependent.validate(dependent.value, fields);
                fields[dep] = { ...fields[dep], feedback };
            });

            setFields({
                ...fields,
                [props.fieldName]: { ...fields[props.fieldName] },
            });
        }
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        update(e.target.value); // make it work for inputs without a value, such as checkbox

        if(props.onChange) {
            props.onChange(e);
        }
    }

    function onBlur(e: React.FocusEvent<HTMLInputElement>) {
        update(e.target.value);

        if(props.onBlur) {
            props.onBlur(e);
        }
    }

    // todo: make it accept the prop: "as" - this should allow the user to render a react element instead of a native input tag
    return <input {...props} onChange={onChange} onBlur={onBlur} />;
}
