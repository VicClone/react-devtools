import { Button } from '../Button/Button';
import './ProfilePage.css';
import { useEffect, useState } from 'react';
import { HOST } from '../constants.tsx';

interface SuccessPageProps {
    onExit: () => void;
}

interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
}

export const ProfilePage = ({ onExit }: SuccessPageProps) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`${HOST}/api/user?id=${userId}`, {
                credentials: 'include',
            });

            if (res.status !== 200) {
                return;
            }

            const data: User = await res.json();
            setUser(data);
        };

        try {
            getUser();
        } catch (e) {
            console.error(e);
        }
    }, []);

    const logout = async () => {
        try {
            const res = await fetch(`${HOST}/api/logout`, {
                credentials: 'include',
            });

            if (res.status === 200) {
                onExit();
            }
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="success-page">
            <div className="success-page__layout">
                {user?.name &&
                    <div className="success-page__cat">
                        <img src="https://cataas.com/cat/gif" alt="cat" />
                    </div>
                }
                <p className="success-page__text">
                    Поздравляю, {user?.name} {user?.surname}!
                    <br />
                    Вы успешно зарегистрировались!
                </p>
                <Button onClick={logout} className="success-page__btn">
                    Выход
                </Button>
            </div>
        </div>
    );
};
