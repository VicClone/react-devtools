import { Button } from '../Button/Button';
import './SuccessPage.css';

interface SuccessPageProps {
    onExit: () => void;
}

export const SuccessPage = ({onExit}: SuccessPageProps) => {
    return (
        <div className="success-page">
            <div className="success-page__layout">
                <p className="success-page__text">
                    Вы успешно зарегистрировались!
                </p>
                <Button onClick={onExit} className="success-page__btn">Выход</Button>
            </div>
        </div>
    );
}