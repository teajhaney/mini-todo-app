import { useTodoContext, Todo } from "../context/TodoProvider"
import { PiTrashThin } from "react-icons/pi";
import { useState } from "react";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";

const TodoList = () => {
    const { todosList, toggleTodo, editTodo, deleteTodo } = useTodoContext();
    const [editText, setEditText] = useState('');
    const [showEditBox, SetShowEditBox] = useState(false);
    // const [editId, setEditId] = useState(null);
    const [editId, setEditId] = useState<string | null>(null);


    // group todo by date
    const groupedTodos = todosList.reduce((acc, todo) => {
        acc[todo.day] = acc[todo.day] || [];
        acc[todo.day].push(todo);
        return acc;
    }, {} as Record<string, Todo[]>);

    const handleConfirmEdit = (id: string) => {
        if (!editText.trim()) return;
        editTodo(id, editText);
        SetShowEditBox(false);
        setEditId(null);
        setEditText('');
    }
    const handleClickToEdit = (e: React.MouseEvent<SVGElement>, id: string, text: string) => {
        e.stopPropagation()
        SetShowEditBox(true);
        setEditId(id)
        setEditText(text)

    }
    const handleDelete = (e: React.MouseEvent<SVGElement>, id: string) => {
        e.stopPropagation(),
            deleteTodo(id);

    }
    const handleCancelEdit = () => {
        SetShowEditBox(false);
        setEditId(null);
        setEditText('');
    };

    // Animation variants for todoLit items
    const todoListVariants = {
        hidden: { opacity: 0, y: -20 }, // Start above and invisible
        visible: { opacity: 1, y: 0 }, // Fade in and slide down
    };
    //Format Date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();

        // Remove time part for an accurate date comparison
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        const diffInDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)); // Difference in days


        if (diffInDays === 0) {
            return "Today";
        } else if (diffInDays === 1) {
            return "Yesterday";
        } else {
            return date.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }); // Show full date
        }
    };
    return (
        <div className=" rounded h-[550px] overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-col gap-5">
            {todosList.length === 0 ? (
                <p className="text-center text-5xl font-bold">No todo yet</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {Object.entries(groupedTodos).map(([day, todos]) => (

                        <div key={formatDate(day)} className="flex flex-col gap-2">
                            {/* Day label */}
                            <h2 className="text-xl font-bold bg-green w-fit mb-2 p-2 rounded text-white">{formatDate(day)}</h2>
                            {todos.map((todo) => (
                                <motion.div
                                    variants={todoListVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    layout
                                    transition={{ duration: 0.5 }}
                                    key={todo.id} className="cursor-pointer">
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-gray p-2 flex justify-between items-start rounded-lg h-fit  shadow-[0px_0px_5px_1px_rgba(0,0,0,0.1)]">
                                            <div className="flex gap-2 items-start w-full  ">
                                                {/* checkbox */}
                                                <input type="checkbox" name="todo" checked={todo.completed} value={todo.id} onChange={(e) => {
                                                    e.stopPropagation();
                                                    toggleTodo(todo.id)
                                                }} id="" className="accent-green" />
                                                {/* text */}
                                                <span className={`${todo.completed ? "line-through text-secondary/50 " : ""}  break-words w-full  `}>{todo.text}</span>
                                            </div>
                                            {/* edit and delete */}
                                            <div className="flex gap-2 text-2xl font-extrabold items-start ">
                                                <CiEdit onClick={(e) => {
                                                    if (!todo.completed) handleClickToEdit(e, todo.id, todo.text);
                                                }} className="text-green" />
                                                <PiTrashThin className="text-red-500" onClick={(e) => handleDelete(e, todo.id)} /> </div>
                                        </div>
                                        {/* time */}
                                        <div className={`flex ${todo.edited ? 'justify-between' : 'justify-end'}`}>
                                            {todo.edited && <span className="text-[7px]  text-secondary/50 italic">Edited ({todo.dateEdited})</span>}
                                            <p className="text-[7px] ">{todo.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )).reverse()}
                        </div>
                    ))}
                </div>

            )}
            {showEditBox && editId !== null && (
                <div className="fixed inset-0  flex items-center justify-center border border-primary ">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-[0px_0px_5px_3px_rgba(0,0,0,0.1)] w-full mx-3 2xl:mx-auto 2xl:w-[1350px]">
                        <h1 className="text-2xl font-bold">Edit your todo</h1>
                        <InputComponent placeHolder='Enter your todo...' value={editText} onChange={(e) => setEditText(e.target.value)} />
                        <div className="flex justify-center gap-2">
                            <ButtonComponent text='Cancel' onClick={handleCancelEdit} className="bg-red-500" />
                            <ButtonComponent text="Confirm" onClick={() => handleConfirmEdit(editId)} className="bg-green" />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
export default TodoList
