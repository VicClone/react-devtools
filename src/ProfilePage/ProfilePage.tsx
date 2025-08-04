import { Button } from '../Button/Button';
import './ProfilePage.css';
import { useEffect, useState } from 'react'

interface SuccessPageProps {
    onExit: () => void;
}

export const ProfilePage = ({onExit}: SuccessPageProps) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const userId = localStorage.getItem("userId");
            const res = await fetch(`http://localhost:3000/api/user?id=${userId}`,
                { credentials: 'include' }
            );

            if (res.status !== 200) {
                return;
            }

            const data = await res.json();
            setUser(data);
        }

        getUser();
    }, []);
    const logout = async () => {
        const res = await fetch('http://localhost:3000/api/logout', {credentials: 'include'});

        if (res.status === 200) {
            onExit();
        }
    }
    return (
        <div className="success-page">
            <div className="success-page__layout">
                {user && JSON.parse(user)}
                <p className="success-page__text">
                    Вы успешно зарегистрировались!
                </p>
                <Button onClick={logout} className="success-page__btn">Выход</Button>
            </div>
        </div>
    );
}