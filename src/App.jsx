import React from "react";
import useForm from "./hooks/useForm";
import InputGroup from "./components/form/Inputgroup";
import Button from "./components/ui/buttons/Button";

const init = {
  firstName: "Sourav Saha",
  lastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors["firstName"] = "First name is required";
  }
  if (!values.lastName) {
    errors["lastName"] = "last name is required";
  }
  if (!values.email) {
    errors["email"] = "Email is required";
  }
  if (!values.password) {
    errors["password"] = "Password is required";
  }

  return errors;
};

export default function App() {
  const {
    formState: state,
    handleBlur,
    handleFocus,
    handleChange,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  // console.log(state.firstName.value);
  const submit = ({ hasErrors, values, errors }) => {
    if (hasErrors) {
      alert("[ERROR]" + JSON.stringify(errors,null, 2));
    } else {
      alert("[SUCCESS]" + JSON.stringify(values));
    }
  };

  return (
    <div className="root">
      <form onSubmit={(e) => handleSubmit(e, submit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "40%",
            margin: "5% auto",
          }}
        >
          <InputGroup
            label={"First Name"}
            name="firstName"
            placeholder={"John"}
            value={state.firstName.value}
            onChange={handleChange}
            error={state.firstName.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            label={"Last Name"}
            name="lastName"
            placeholder={"Doe"}
            value={state.lastName.value}
            onChange={handleChange}
            error={state.lastName.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            label={"Email"}
            name="email"
            placeholder={"johndoe@example.com"}
            value={state.email.value}
            onChange={handleChange}
            error={state.email.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            label={"Password"}
            name="password"
            placeholder={"********"}
            value={state.password.value}
            onChange={handleChange}
            error={state.password.errors}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Button type="reset" onClick={clear} style={{ padding: "15px 0px" }}>
            Clear
          </Button>

          <Button
            type="submit"
            style={{ padding: "15px 0px", backgroundColor: "green" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
