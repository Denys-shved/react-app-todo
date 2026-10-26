
import styles from './Button.module.scss'

type ButtonProps = {
    className?: string;
    type: "button" | "submit" | "reset";
    children: React.ReactNode;
    onClick?: () => void;
    isDisabled?: boolean
};

const Button = (props: ButtonProps) => {
    return(
        <button 
        className={`${styles.button} ${props.className ?? ""}`}
        type={props.type}
        disabled={props.isDisabled ?? false}
        onClick={props.onClick}>{props.children}</button>
    )
}

export default Button