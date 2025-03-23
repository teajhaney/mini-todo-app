import { useTodoContext } from "../context/TodoProvider"
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

    return (
        <div className="w-full rounded h-[550px] overflow-y-scroll [&::-webkit-scrollbar]:hidden flex flex-col gap-5">
            {todosList.length === 0 ? (
                <p className="text-center text-5xl font-bold">No todo yet</p>
            ) : (
                todosList.map((todo) => (
                    <motion.div
                        variants={todoListVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        layout
                        transition={{ duration: 0.5 }}
                        key={todo.id} className="cursor-pointer">
                        <div className="bg-gray p-2 flex justify-between items-start rounded-lg h-fit shadow-[0px_0px_5px_1px_rgba(0,0,0,0.1)]">
                            <div className="flex gap-5 items-start flex-1 min-w-0  ">
                                <input type="checkbox" name="todo" checked={todo.completed} value={todo.id} onChange={(e) => {
                                    e.stopPropagation();
                                    toggleTodo(todo.id)
                                }} id="" />
                                <span className={`${todo.completed ? "line-through " : ""} bg-red-500 break-words max-w-full`}>{todo.text}</span>
                            </div>
                            <div className="flex gap-2 text-2xl font-extrabold items-start ">
                                <CiEdit onClick={(e) => handleClickToEdit(e, todo.id, todo.text)} className="text-green" />
                                <PiTrashThin className="text-red-500" onClick={(e) => handleDelete(e, todo.id)} /> </div>
                        </div>
                    </motion.div>
                )).reverse()
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

