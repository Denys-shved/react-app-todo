
import Field from "../Field/Field"

type SearchTaskFormProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const SearchTaskForm = (props: SearchTaskFormProps) => {
    return (
      <form className="todo__form">
        <Field
            className="todo__field"
            label="Search task"
            id="search-task"
            type="search"
            value={props.searchQuery}
            onInputChange={(e) => props.setSearchQuery(e.currentTarget.value)}
            />
      </form>
    )
}

export default SearchTaskForm