
import { useState } from "react";
import Button from "../Button/Button"
import Field from "../Field/Field"

type AddTaskFormProps = {
    onAddTask: () => void;
    newTaskTitle: string;
    setNewTaskTitle: (value: string) => void;
    newTaskInputRef: React.RefObject<HTMLInputElement | null>;
};

const AddTaskForm = (props: AddTaskFormProps) => {

    const [error, setError] = useState("")

    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        props.onAddTask()
    }

    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
                // console.log("Введено:", event.currentTarget.value)
                // props.setNewTaskTitle(event.currentTarget.value)}
                const {value} = event.target
                const clearValue = value.trim()
                const hasOnlySpace = value.length > 0 && clearValue.length === 0

                props.setNewTaskTitle(value)
                setError(hasOnlySpace ? "The task cannot be empty" : "")
    }
    
    return(
        <form className="todo__form" onSubmit={handlerSubmit}>
            <Field
                className="todo__field"
                id="New-task"
                error={error}
                label="New task title"
                value={props.newTaskTitle}
                // onInputChange={(event) => props.setNewTaskTitle(event.currentTarget.value)}
                onInputChange={onInput}
                inputRef={props.newTaskInputRef}
            />
            <Button type="submit"
            isDisabled={props.newTaskTitle.trim().length === 0}
            >Add</Button>
      </form>
    )
}

export default AddTaskForm