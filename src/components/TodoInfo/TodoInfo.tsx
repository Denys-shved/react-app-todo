
import { useContext } from "react"
import { TasksContext } from "../../context/TasksContext"
// type TodoInfo = {total: number,
//         done: number,
//         onDeleteAllTasksButton: () => void}

const TodoInfo = () => {
    const context = useContext(TasksContext);

    if (!context) {
    throw new Error("TodoInfo must be used within TasksContext.Provider");
}

    const total = context.tasks.length;
    const done = context.tasks.filter((task) => task.isDone).length;
    const hasTasks = total > 0;

    return (
      <div className="todo__info">
        <div className="todo__total-tasks">
            Done: {done} from {total}
        </div>
        {hasTasks && (
            <button className="todo__delete-all-button" 
            type="button"
            onClick={context?.deleteAllTasks}>
            Delete all
            </button>
        )}
      </div>
    )
}

export default TodoInfo