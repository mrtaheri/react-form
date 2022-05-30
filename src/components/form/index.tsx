import React from "react";
import { fieldsWithError, setFormDefaults } from "./utils";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onChangeForm?: (e: FormStateType) => void;
  onSubmitForm?: (e: FormStateType) => void;
  onErrorSubmit?: (e: string[]) => void;
}

const Form = (props: IFormProps): JSX.Element => {
  const {
    children,
    onChangeForm,
    onSubmitForm = (e: any) => undefined,
    onErrorSubmit = (e: string[]) => undefined,
    ...rest
  } = props;
  const [state, setState] = React.useState<FormStateType>({});
  const [errorFields, setErrorFields] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFormDefaults(children, setState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  React.useEffect(() => {
    if (typeof onChangeForm !== "undefined") {
      onChangeForm(state);
    }
  }, [onChangeForm, state]);

  const changeFormState = (item: any) => {
    const [{ value, name }, error] = item;
    const clonedState: FormStateType = { ...state };
    clonedState[name] = value;

    setErrorFields(fieldsWithError(errorFields, name, error));
    setState(clonedState);
  };

  const onSubmitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    onErrorSubmit(errorFields);
    onSubmitForm(state);
  };

  return (
    <form onSubmit={onSubmitHandler} {...rest}>
      {React.Children.map(children, (element: any) => {
        return React.cloneElement(element, {
          onChange: changeFormState,
        });
      })}
    </form>
  );
};

export default Form;
