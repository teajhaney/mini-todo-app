interface ButtonProps {
    text: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


const ButtonComponent = ({ text, className, onClick }: ButtonProps) => {
    return (
        <button className={`text-2xl font-bold  px-2 py-1 rounded-lg w-fit place-self-end text-white cursor-pointer ${className}`} onClick={onClick} >
            {text}
        </button>
    )
}

export default ButtonComponent
