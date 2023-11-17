
type FormInputProps = {
  id: string;
  type: string;
  label: string;
  errorMessage: any;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  label,
  errorMessage,
  value,
  onChange,
}) => {
  return (
    <div className="form-input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FormInput;