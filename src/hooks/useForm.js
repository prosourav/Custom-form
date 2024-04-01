import { useState } from "react";
import { deepClone, isObjEmpty } from "../utils/deep-clone";

/**
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 * create form using this useForm hook easily
 * @param {Param} param0
 * @returns
 */

const useForm = ({ init, validate }) => {
  const [state, setState] = useState(() => mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    oldState[key].value = value;
    const { errors } = getErrors(oldState);

    if (oldState[key].touched && errors[key]) {
      oldState[key].errors = errors[key];
    } else {
      oldState[key].errors = "";
    }
    setState({ ...oldState });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);
    oldState[name].focused = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }

    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = getErrors(state);
    const oldState = deepClone(state);
    if (oldState[key].touched && errors[key]) {
      oldState[key].errors = errors[key];
    } else {
      oldState[key].errors = "";
    }
    oldState[key].focused = false;
    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();

    const { hasErrors, values, errors } = getErrors(state);
    const oldState = deepClone(state);

    Object.keys(errors).forEach((key) => {
      oldState[key].errors = errors[key];
    });
    setState({ ...oldState });

    cb({
      hasErrors,
      values,
      errors,
      touched: mapStateToKeys(state, "touched"),
      focused: mapStateToKeys(state, "focused"),
    });
  };

  const clear = () => {
    const newState = mapValuesToState(init, true);
    setState({ ...newState });
  };

  const getErrors = (state) => {
    let hasErrors = null,
      errors = null;
    const values = mapStateToKeys(state, "value");

    if (typeof validate === "boolean") {
      hasErrors = validate;
      errors = mapStateToKeys(state, "errors");
    } else if (typeof validate === "function") {
      const errorsFromCb = validate(values);
      hasErrors = !isObjEmpty(errorsFromCb);
      errors = errorsFromCb;
    } else {
      throw new Error("Validate property must be boolean or function");
    }

    return {
      values,
      errors,
      hasErrors,
    };
  };

  return {
    formState: state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  };
};

export default useForm;

// helper functions

const mapValuesToState = (values, shouldClear = false) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value: shouldClear ? "" : values[key],
      errors: "",
      focused: false,
      touched: false,
    };
    return acc;
  }, {});
};

const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};
