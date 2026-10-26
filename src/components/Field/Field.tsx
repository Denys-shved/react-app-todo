import styles from './Field.module.scss'

type PropsField = {
    className?: string;
    id: string;
    label: string;
    type?: string;
    onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    value?: string;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    error?: string;
}

const Field = (props: PropsField) => {
    return (
        <div className={`${styles.field} ${props.className ?? ""}`}>
          <label
            className={styles.field__label}
            htmlFor={props.id}
          >
            {props.label}
          </label>

          <input
            className={`${styles.field__input} ${
              props.error ? styles["is-invalid"] : ""
            }`}
            id={props.id}
            placeholder=" "
            autoComplete="off"
            type={props.type}
            value={props.value}
            onChange={props.onInputChange}
            ref={props.inputRef}
          />
        </div>
    )
}

export default Field