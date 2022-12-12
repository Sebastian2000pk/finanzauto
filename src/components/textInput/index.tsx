import "./style.css";

interface PropsTextInput {
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}

const TextInput = ({ value, onChange, placeholder = "" }: PropsTextInput) => {
  return (
    <div className="input__container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
