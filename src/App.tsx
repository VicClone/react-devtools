import { useState } from 'react'
import './App.css'
import { RegistrationForm } from './Registration/RegistrationForm.tsx'
import { SuccessPage } from './SuccessPage/SuccessPage.tsx'

function App() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <>
            {!isSuccess && <RegistrationForm onSuccess={() => setIsSuccess(true)}/>}
            {isSuccess && <SuccessPage onExit={() => setIsSuccess(false)}/>}
        </>
    )
}

export default App
