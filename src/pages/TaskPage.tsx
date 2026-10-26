import { useEffect, useState } from "react"
import tasksAPI, { type Task } from "../components/api/tasksApi"

type TaskPageProps = {
    params: {
        id:string
    }
};

const TaskPage = (props: TaskPageProps) => {

    const taskId = props.params.id
    const [task, setTask] = useState<Task | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(()=>{
        tasksAPI.getById(taskId).then((taskData)=>{
            setTask(taskData)
            setHasError(false)
        })
        .catch(()=>{
            setHasError(true)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [taskId])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(hasError){
        return <div>Task not found!</div>
    }

    if (!task) {
    return <div>Task not found!</div>
    }

    return (
        <div>
            <h1>{task.title}</h1>
            {task.isDone ? "Task absolutly done" : "Task undone!"}
        </div>
    )
}

export default TaskPage