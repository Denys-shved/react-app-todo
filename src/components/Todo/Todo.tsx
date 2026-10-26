import { useState, useEffect, useRef } from "react"
import AddTaskForm from "../AddTaskForm/AddTaskForm"
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm"
import TodoInfo from "../TodoInfo/TodoInfo";
import TodoList from "../TodoList/TodoList"
import Button from "../Button/Button"
import { TasksContext } from "../../context/TasksContext"
import tasksAPI from "../api/tasksApi";
import styles from './Todo.module.scss'

type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

const Todo = () => {
    
    const [tasks, setTasks] = useState<Task[]>(
        // () => {
        // const savedTasks = localStorage.getItem("tasks")
        // return savedTasks ? JSON.parse(savedTasks) : [
        // { id: "1", title: "Task 1", isDone: false },
        // { id: "2", title: "Task 2", isDone: true }
        // ]}
        []
    )

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")

    const [searchQuery, setSearchQuery] = useState<string>("")

    const newTaskInputRef = useRef<HTMLInputElement>(null)
    const firstIncompleteRef = useRef<HTMLLIElement>(null)
    const firstIncompleteTaskId = tasks.find((task) => !task.isDone)?.id

    const deleteAllTasks = () => {
        if (!confirm("Are you sure you want to delete all tasks?")) {
            return;
        }

        tasksAPI.deleteAll(tasks)
            .then(() => {
                setTasks([]);
            })
            .catch((error: unknown) => {
                console.error("Failed to delete all tasks:", error);
            });
    };

    const deleteTask = (id: string) => {
        tasksAPI.delete(id)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task.id !== id)
                );
            })
            .catch((error: unknown) => {
                console.error("Failed to delete task:", error);
            });
    };

    const toggleTaskComplete = (taskId: string, isDone: boolean) => {
        tasksAPI.toggleComplete(taskId, isDone)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId
                            ? { ...task, isDone }
                            : task
                    )
                );
            })
            .catch((error: unknown) => {
                console.error("Failed to update task:", error);
            });
    };

    

    const addTask = () => {
        if (newTaskTitle.trim().length === 0) return;

        const newTask = {
            title: newTaskTitle.trim(),
            isDone: false,
        };

        tasksAPI.add(newTask)
            .then((addedTask) => {
                setTasks((prevTasks) => [...prevTasks, addedTask]);
                setNewTaskTitle("");
                setSearchQuery("");
                newTaskInputRef.current?.focus();
            })
            .catch((error: unknown) => {
                console.error("Failed to add task:", error);
            });
    };

    // useEffect(() => {
    //     console.log("Tasks updated:", tasks)
    //     localStorage.setItem("tasks", JSON.stringify(tasks))
    // }, [tasks])

    // useEffect(() => {
    //     newTaskInputRef.current?.focus()
    //     fetch('http://localhost:3001/tasks')
    //     .then((response)=>response.json())
    //     .then(setTasks)
    // }, [])
    useEffect(() => {
        newTaskInputRef.current?.focus();

        tasksAPI.getAll()
            .then(setTasks)
            .catch((error: unknown) => {
                console.error("Failed to load tasks:", error);
            });
    }, []);

    const clearSearchQuery = searchQuery.trim().toLowerCase()
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
        : null

    return (
      <TasksContext.Provider
      value={
        {
            tasks,
            filteredTasks,
            firstIncompleteRef,
            firstIncompleteTaskId,
            deleteTask,
            deleteAllTasks,
            toggleTaskComplete
        }
      }>
        <div className={styles["todo"]}>
            <h1 className={styles["todo__title"]}>To Do List</h1>
            <AddTaskForm 
                onAddTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo 
                // total={tasks.length} 
                // done={tasks.filter((t: { isDone: boolean }) => t.isDone).length}
                // onDeleteAllTasksButton={deleteAllTasks} 
            />
            <Button 
            type="button"
                onClick={() => {
                console.log("Show incomplete tasks")
                firstIncompleteRef.current?.scrollIntoView({behavior: 'smooth'})
                }}
            >
                Incomplete task
            </Button>
            <TodoList 
                // tasks={tasks}
                // filteredTasks={filteredTasks}
                // firstIncompleteRef={firstIncompleteRef}
                // firstIncompleteTaskId={firstIncompleteTaskId}
                // onDeleteTaskButtonClick={deleteTask}
                // onTaskCompleteChange={toggleTaskComplete} 
            />      
            </div>
      </TasksContext.Provider>
    )
}

export default Todo