// useContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

// Define Todo interface
interface Todo {
    id: string;
    text: string;
    completed: boolean;
    date: string;
}

// Define context value interface
interface TodoContextValue {
    todosList: Todo[];
    setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>;
    addTodo: (text: string) => void;
    resetTodo: () => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteTodo: (id: string) => void;
}



// Create context with default value
export const StateContext = createContext<TodoContextValue | undefined>(undefined);

// Provider props interface
interface TodoProviderProps {
    children: React.ReactNode;
}

// TodoProvider component
export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todosList, setTodosList] = useState<Todo[]>(() => {
        const storedTodosList = localStorage.getItem("todosList");
        return storedTodosList ? JSON.parse(storedTodosList) : [];
    });

    // Store todosList in localStorage when it updates
    useEffect(() => {
        localStorage.setItem("todosList", JSON.stringify(todosList));
    }, [todosList]);

    //Add todo List
    // const addTodo = (newTodo: Todo) => {
    //     setTodosList([...todosList, newTodo]);
    // };


    const addTodo = (text: string) => {
        const newTodo = {
            id: Date.now().toString(),
            text,
            completed: false,
            date: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // Use false for 24-hour format
            }),
        };
        setTodosList([...todosList, newTodo]);

    };

    //reset todolist back to length zero
    const resetTodo = () => {
        localStorage.clear();
        setTodosList([]);
    }


    //toggle completed
    const toggleTodo = (id: string) => {
        setTodosList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    //Edit todo
    const editTodo = (id: string, newText: string) => {
        setTodosList((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    }


    //Delete todo
    const deleteTodo = (id: string) => {
        setTodosList(todosList.filter(todo => todo.id !== id));
    };
    return (
        <StateContext.Provider value={{ todosList, setTodosList, addTodo, resetTodo, toggleTodo, editTodo, deleteTodo }}>
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the context
export const useTodoContext = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};