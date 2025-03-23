import { useState } from 'react'

import { ButtonComponent, InputComponent, TodoList } from './component/exportComponent'
import { useTodoContext } from './context/TodoProvider';
import { GrPowerReset } from "react-icons/gr";

function App() {
  const [todoValue, setTodoValue] = useState('');
  const { addTodo, todosList, resetTodo } = useTodoContext();

  const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <div className='border border-green flex flex-col gap-5'>
            <div className="flex justify-between text-5xl font-bold">
              <h1 className='text-5xl font-bold'>Mini todo</h1>
              <GrPowerReset className='cursor-pointer' onClick={resetTodos} />
            </div>
            <InputComponent placeHolder='Enter your todo...' value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
            <ButtonComponent text='Add todo' className='bg-green' onClick={handleAddTodo} />
          </div>
          <div className='border border-green  flex flex-col gap-5'>
            <h1>Todo List ({todosList.length})</h1>
            <TodoList />
          </div>
        </div>
      </section></>
  )
}

export default App
