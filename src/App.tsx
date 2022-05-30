import React from "react";
import Form from "./components/form";
import Input from "./components/input";
import Validator from "./utils/validator";

function App() {
  const [formErrors, setFormErrors] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<any>({});

  return (
    <div className="App">
      <Form onErrorSubmit={setFormErrors} onSubmitForm={setUser}>
        <Input
          validators={[
            { check: Validator.required, message: "The field is required." },
          ]}
          defaultValue="boo"
          placeholder="enter here"
          name="email"
        />
        <Input
          validators={[
            { check: Validator.required, message: "The field is required." },
          ]}
          placeholder="enter here"
          type="password"
          name="password"
        />
        <button type="submit">Login</button>
      </Form>
      <div>
        {formErrors?.length ? `error on ${formErrors.join(", ")}` : null}
      </div>
      <div>{user ? `form informatin is :${JSON.stringify(user)}` : null}</div>
    </div>
  );
}

export default App;
