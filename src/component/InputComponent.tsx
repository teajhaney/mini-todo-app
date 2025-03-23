interface InputComponentProps {
    placeHolder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

const InputComponent = ({ placeHolder, onChange, value }: InputComponentProps) => {
    return (
        <input type='text' className='h-10 w-full border border-green px-2 bg-gray rounded-lg focus:outline-none  ' placeholder={placeHolder} onChange={onChange} value={value} />

    )
}

export default InputComponent
