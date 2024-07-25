// import './App.css'
import { useState } from "react";
import Inputgroup from "./components/form/Inputgroup";
import Button from "./components/ui/buttons/Button";
import { deepClone } from "./utils/deep-clone";

const init = {
  title: { values: "", errors: "", focus: false },
  bio: { values: "", errors: "", focus: false },
  skills: { values: "", errors: "", focus: false },
};

function App() {
  const [state, setState] = useState({ ...init });

  const mapStateToValue = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].values;
      return acc;
    }, {});
  };

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;
    if (!title) {
      errors["title"] = "Invalid title";
    }
    if (!bio) {
      errors["bio"] = "Invalid bio";
    }
    if (!skills) {
      errors["skills"] = "Invalid skills";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    oldState[key].values = value;

    const values = mapStateToValue(oldState);
    const { errors } = checkValidity(values);

    if (oldState[key].focus && errors[key]) {
      oldState[key].errors = errors[key];
    } else {
      oldState[key].errors = "";
    }
    // console.log("oldState: ", oldState);
    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValue(state);

    const { isValid, errors } = checkValidity(values);

    if (isValid) {
      console.log("validated", state);
    } else {
      const oldState = deepClone(state);
      Object.keys(errors).forEach((key) => {
        oldState[key].errors = errors[key];
      });
      setState(oldState);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValue(state);
    const { errors } = checkValidity(values);
    const oldState = deepClone(state);
    if (oldState[key].focus && errors[key]) {
      oldState[key].errors = errors[key];
    } else {
      oldState[key].errors = "";
    }
    setState(oldState);
  };

  return (
    <>
      <div className="root">
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "40%",
              margin: "10% auto",
            }}
          >
            <Inputgroup
              label={"Title"}
              name="title"
              placeholder={"Software Engineer"}
              value={state.title.values}
              onChange={handleChange}
              error={state.title.errors}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />{" "}
            <Inputgroup
              label={"Bio"}
              name="bio"
              placeholder={"I am software engineer..."}
              value={state.bio.values}
              onChange={handleChange}
              error={state.bio.errors}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />{" "}
            <Inputgroup
              label={"Skills"}
              name="skills"
              placeholder={"javascript, react"}
              value={state.skills.values}
              onChange={handleChange}
              error={state.skills.errors}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button type="submit" style={{ padding: "14px 0px" }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;