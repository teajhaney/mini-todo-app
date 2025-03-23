import { useTodoContext } from "../context/TodoProvider"


const TodoList = () => {
    const { todosList } = useTodoContext();

    return (
        <div className="w-full h-62 border border-green">
            {todosList.length === 0 ? (
                <p>No todos yet</p>
            ) : (
                <ul>
                    {todosList.map((todo) => (
                        <li key={todo.id}>
                            {todo.text}
                        </li>
                    )).reverse()}
                </ul>
            )}
        </div>
    )
}

export default TodoList
