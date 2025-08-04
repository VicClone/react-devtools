import { useEffect, useState } from 'react';
import './App.css'
import { RegistrationForm } from './Registration/RegistrationForm.tsx'
import { ProfilePage } from './ProfilePage/ProfilePage.tsx'

function App() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const auth = async () => {
            const id = localStorage.getItem('userId');
            const res = await fetch(`http://localhost:3000/api/auth?id=${id}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ id }),
                    headers: {"content-type": "application/json"},
                    credentials: 'include'
                });

            setIsSuccess(res.status === 200);
        };

        try {
            setIsLoading(true)
            auth();
        }   catch (e) {
            setIsFailure(true)
        } finally {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <h3>Загрузка...</h3>;
    }

    if (isFailure) {
        return <h3>Произошла ошибка!</h3>;
    }

    return (
        <>
            {!isSuccess && <RegistrationForm onSuccess={() => setIsSuccess(true)}/>}
            {isSuccess && <ProfilePage onExit={() => setIsSuccess(false)}/>}
        </>
    )
}

export default App
