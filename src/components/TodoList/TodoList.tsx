
import TodoItem from "../TodoItem/TodoItem"
import { useContext } from "react";
import { TasksContext } from "../../context/TasksContext";

import styles from "./TodoList.module.scss";

// type Todo = {
// id: string;
// title: string;
// isDone: boolean;
// };

// type TodoListProps = {
// tasks: Todo[];
// filteredTasks: Todo[] | null;
// onDeleteTaskButtonClick: (id: string) => void;
// onTaskCompleteChange: (id: string, isDone: boolean) => void;
// firstIncompleteRef: React.RefObject<HTMLLIElement | null>;
// firstIncompleteTaskId: string | undefined;
// };

const TodoList = () => {
    

    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("TodoList must be used within TasksContext.Provider");
    }

    const visibleTasks = context.filteredTasks ?? context.tasks;
        if (visibleTasks.length === 0) {
        return (
            <div className={styles["todo__empty-message"]}>
            No tasks found
            </div>
        );
        }

    return (
        <ul className={styles["todo__list"]}>
            {visibleTasks.map((task) => (
            <TodoItem
                key={task.id}
                firstIncomplRef={
                task.id === context.firstIncompleteTaskId
                    ? context.firstIncompleteRef
                    : null
                }
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                onDeleteTaskButtonClick={context.deleteTask}
                onTaskCompleteChange={context.toggleTaskComplete}
            />
            ))}
        </ul>
        );
}

export default TodoList 