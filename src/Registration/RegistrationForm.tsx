import './RegistrationForm.css';
import { Field } from './Field.tsx';
import { Input, type InputValue } from '../Input/Input.tsx';
import { useState } from 'react';
import { Button } from '../Button/Button.tsx';
import { HOST } from '../constants.tsx';

interface RegistrationFormProps {
    onSuccess: () => void;
}

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
    const [name, setName] = useState<InputValue>('');
    const [surname, setSurname] = useState<InputValue>('');
    const [email, setEmail] = useState<InputValue>('');
    const [password, setPassword] = useState<InputValue>('');
    const [confirmPassword, setConfirmPassword] =
        useState<InputValue>('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch(`${HOST}/api/register`, {
                method: 'POST',
                body: JSON.stringify({ name, surname, email, password }),
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
            });

            if (res.statusText.toLowerCase() === 'ok') {
                const data = await res.json();
                localStorage.setItem('userId', data.id);
                onSuccess();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="registration-form" action={(e: unknown) => {onSubmit(e as React.FormEvent<HTMLFormElement>)}} method={"GET"}>
            <fieldset className="registration-form__fieldset">
                <legend className="registration-form__legend">
                    Привет! Давай попробуем зарегистрироваться
                </legend>
                <Field title="Имя" inputHtmlId="name">
                    <Input
                        htmlId="name"
                        name="name"
                        required
                        value={name}
                        onValueChange={setName}
                    />
                </Field>
                <Field title="Фамилия" inputHtmlId="surname">
                    <Input
                        htmlId="surname"
                        name="surname"
                        required
                        value={name}
                        onValueChange={setSurname}
                    />
                </Field>
                <Field title="Почта" inputHtmlId="email">
                    <Input
                        htmlId="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onValueChange={setEmail}
                        disabled
                    />
                </Field>
                <Field title="Пароль" inputHtmlId="password">
                    <Input
                        htmlId="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onValueChange={setPassword}
                    />
                </Field>
                <Field title="Повторите пароль" inputHtmlId="password">
                    <Input
                        htmlId="password-confirm"
                        name="password-confirm"
                        type="password"
                        required
                        value={confirmPassword}
                        onValueChange={setConfirmPassword}
                    />
                </Field>

                <Button type="button">Зарегистрироваться</Button>
            </fieldset>
        </form>
    );
};
