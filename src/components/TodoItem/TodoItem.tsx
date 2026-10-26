import RouterLink from "../RouterLink/RouterLink";
import styles from "./TodoItem.module.scss"

const TodoItem = (props: { className?: string,
    id: string,
    title: string,
    isDone?: boolean,
    onDeleteTaskButtonClick?: (id: string) => void,
    onTaskCompleteChange: (id: string, isDone: boolean) => void,
    firstIncomplRef?: React.RefObject<HTMLLIElement | null> | null;
 }) => {
    return(
        <li
            className={`${styles["todo-item"]} ${props.className ?? ""}`}
            ref={props.firstIncomplRef}
          >
          <input
            className={styles["todo-item__checkbox"]}
            id={props.id}
            type="checkbox"
            checked={props.isDone}
            onChange={(e) => props.onTaskCompleteChange?.(props.id, e.target.checked)}
          />
          <label
            className="visually-hidden"
            htmlFor={props.id}
          >
            {props.title}
          </label>
          <RouterLink to={`/tasks/${props.id}`} aria-label="Task detail page">
            {props.title}
          </RouterLink>
          <button
            className={styles["todo-item__delete-button"]}
            aria-label="Delete"
            title="Delete"
            onClick={() => props.onDeleteTaskButtonClick?.(props.id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#757575"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
    )
}

export default TodoItem