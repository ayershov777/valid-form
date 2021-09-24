import React, { useContext } from 'react'
import { formContext } from '../../contexts/FormContext';

type FeedbackProps = {
    for: string;
};

export default function Feedback(props: FeedbackProps) {

    const { fields } = useContext(formContext);
    
    const feedback = fields[props.for]?.feedback;

    return <span>{feedback}</span>;
}
