import { useEffect, useState } from 'react';
import './App.css'
import { RegistrationForm } from './Registration/RegistrationForm.tsx'
import { ProfilePage } from './ProfilePage/ProfilePage.tsx'
import { HOST } from './constants.tsx';

function App() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const auth = async () => {
            try {
                setIsLoading(true);
                const id = localStorage.getItem('userId');
                const res = await fetch(`${HOST}/api/auth?id=${id}`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ id }),
                        headers: {"content-type": "application/json"},
                        credentials: 'include'
                    });
                setIsSuccess(res.status === 200);
            } catch (e) {
                setIsSuccess(false);
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        auth();
    }, []);

    if (isLoading) {
        return (
            <div className="loading">
                <h3>Загрузка...</h3>
            </div>
        );
    }

    return (
        <>
            {!isSuccess && <RegistrationForm onSuccess={() => setIsSuccess(true)}/>}
            {isSuccess && <ProfilePage onExit={() => setIsSuccess(false)}/>}
        </>
    )
}

export default App
