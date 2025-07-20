import './Button.css';
interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    className?: string;
}

export const Button = ({children, onClick, className, type = "button"}: ButtonProps) => {
    const classNames = ['button', className].join(' ');

    return (
        <button className={classNames} onClick={onClick} type={type}>{children}</button>
    );
}