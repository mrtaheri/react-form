import React, { ChangeEvent } from "react";
import { inputValidator } from "../../utils/validator";

interface InputProps {
  validators?: any[];
  label?: string | undefined;
  value?: string | undefined;
  defaultValue?: string | undefined;
  type?: string;
  placeholder: string;
  name: string;
  onChange?: (e: any) => void;
}

function Input(props: InputProps): JSX.Element {
  const {
    validators = [],
    label = undefined,
    value = undefined,
    defaultValue = undefined,
    type = "text",
    placeholder,
    name,
    onChange = (e) => undefined,
  } = props;
  const [error, setError] = React.useState<any>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const err = inputValidator(validators, value);
    setError(err);
    onChange([{ name, value }, err]);
  };

  React.useEffect(() => {
    if (defaultValue?.length) {
      return onChange([{ name, value: defaultValue }, error]);
    }

    const err = inputValidator(validators, "");
    return onChange([{ name, value: "" }, err]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <div className="input-field">
      {label ? <label>{label}</label> : null}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      {error && <span className="error">{error?.message}</span>}
    </div>
  );
}

export default Input;
