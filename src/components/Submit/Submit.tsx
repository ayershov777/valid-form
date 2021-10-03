import React from 'react';

type SubmitProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Submit(props: SubmitProps) {
    return (
        <input {...props} type="submit" />
    );
}
