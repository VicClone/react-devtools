import React from 'react'
import './Field.css'

interface FieldProps {
    title: string
    inputHtmlId: string
    children: React.ReactNode
}

export const Field = ({ title, inputHtmlId, children }: FieldProps) => {
    return (
        <div className="field">
            <label className="field__name" htmlFor={inputHtmlId}>
                {title}
            </label>
            {children}
        </div>
    )
}
