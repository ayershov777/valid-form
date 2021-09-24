import React from "react";
import { Validator } from "../components/Input/Input";

export type FormContext  = {
    fields: Record<string, Field>;
    setFields?: React.Dispatch<React.SetStateAction<Fields>>;
};

export type Fields = Record<string, Field>;

export type Field = {
    value: string;
    feedback: string;
    validate: Validator;
};

export const formContext = React.createContext<FormContext>({
    fields: {},
});