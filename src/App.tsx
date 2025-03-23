import { useState } from 'react'
import { ButtonComponent, InputComponent, TodoList } from './component/exportComponent'
import { useTodoContext } from './context/TodoProvider';
import { GrPowerReset } from "react-icons/gr";

function App() {
  const [todoValue, setTodoValue] = useState('');
  const { addTodo, todosList, resetTodo } = useTodoContext();

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoValue.trim()) return; // Prevent empty todos
    addTodo(todoValue); // Pass the newTodo object to addTodo
    setTodoValue(''); // Clear input
  };

  const resetTodos = () => {
    resetTodo();
  }
  return (
    <>
      <section className='relative my-10 mx-3 h-full 2xl:mx-auto 2xl:w-[1350px] border border-primary rounded-lg p-5'>
        <div className="flex flex-col gap-5 h-full w-full ">
          <form onSubmit={handleAddTodo}>
            <div className='p-2 rounded-lg bg-green flex flex-col gap-5 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.1)]'>
              <div className="flex justify-between text-5xl font-bold">
                <h1 className='text-5xl font-bold text-white'>Mini todo</h1>
                <GrPowerReset className='cursor-pointer text-white' onClick={resetTodos} />
              </div>
              <InputComponent placeHolder='Enter your todo...' value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
              <ButtonComponent text='Add todo' className='bg-secondary place-self-end' type='submit' />
            </div>
          </form>
          <div className='  flex flex-col gap-5'>
            <h1>Todo List ({todosList.length})</h1>
            <TodoList />
          </div>
        </div>
      </section>
    </>
  )
}

export default App
