import { useState } from 'react'
import './App.css'
import { RegistrationForm } from './Registration/RegistrationForm.tsx'
import { ProfilePage } from './ProfilePage/ProfilePage.tsx'

function App() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <>
            {!isSuccess && <RegistrationForm onSuccess={() => setIsSuccess(true)}/>}
            {isSuccess && <ProfilePage onExit={() => setIsSuccess(false)}/>}
        </>
    )
}

export default App
