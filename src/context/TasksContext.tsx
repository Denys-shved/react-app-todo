import { createContext } from "react";

type Task = {
    id: string;
    title: string;
    isDone: boolean;
};

type TasksContextType = {
    tasks: Task[];
    filteredTasks: Task[] | null;
    firstIncompleteRef: React.RefObject<HTMLLIElement | null>;
    firstIncompleteTaskId: string | undefined;
    deleteTask: (id: string) => void;
    deleteAllTasks: () => void;
    toggleTaskComplete: (id: string, isDone: boolean) => void;
};

export const TasksContext = createContext<TasksContextType | null>(null)