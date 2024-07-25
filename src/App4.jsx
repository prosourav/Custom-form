// import './App.css'
import { useState } from "react";
import Inputgroup from "./components/form/Inputgroup";
import Button from "./components/ui/buttons/Button";

const init = {
  title: "",
  bio: "",
  skills: "",
};

function App() {
  const [values, setValues] = useState({ ...init });
  const [errors, setErrors] = useState({ ...init });
  const [focuses, setFocuses] = useState({
    title: false,
    bio: false,
    skills: false,
  });

  const handleChange = (e) => {
    setValues((prv) => ({ ...prv, [e.target.name]: e.target.value }));

    const key = e.target.name;

    const { errors } = checkValidity(values);
    if (!errors[key]) {
      setErrors((prv) => ({ ...prv, [key]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = checkValidity(values);
    if (isValid) {
      console.log(values);
      setErrors({});
    } else {
      setErrors({ ...errors });
    }
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

  const handleFocus = (e) => {
    setFocuses((prv) => ({ ...prv, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = checkValidity(values);
    if (errors[key] && focuses[key] === true) {
      setErrors((prv) => ({ ...prv, [key]: errors[key] }));
    } else {
      setErrors((prv) => ({ ...prv, [key]: "" }));
    }
  };

  return (
    <>
      <div className="root">
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Inputgroup
              label={"Title"}
              name="title"
              placeholder={"Software Engineer"}
              value={values.title}
              onChange={handleChange}
              error={errors.title}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />{" "}
            <Inputgroup
              label={"Bio"}
              name="bio"
              placeholder={"I am software engineer..."}
              value={values.bio}
              onChange={handleChange}
              error={errors.bio}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />{" "}
            <Inputgroup
              label={"Skills"}
              name="skills"
              placeholder={"javascript, react"}
              value={values.skills}
              onChange={handleChange}
              error={errors.skills}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
