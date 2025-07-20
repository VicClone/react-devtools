import './Input.css'
import React from 'react'

export type InputValue = string | null | undefined;

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
    value: InputValue;
    htmlId: string
    onValueChange: (value: InputValue) => void
}

export const Input = ({ htmlId, value, onValueChange, ...props }: InputProps) => {
    const onInput = (e?: React.FormEvent<HTMLInputElement>) => {
        const target = e?.target as HTMLInputElement;

        onValueChange(target?.value);
    };

    return (
        <input
            className="form-input"
            id={htmlId}
            {...props}
            value={value ?? undefined}
            onInput={onInput}
        />
    )
}
