import { useState } from "react";
import creditCardValidator from "../components/Dashboard/Payment/creditCardValidator";

export const cardForm = () => {
  const [values, setValues] = useState({
    cvc: "",
    expirationDate: "",
    focus: "",
    name: "",
    number: "",
  });

  const [errors, setErrors] = useState({});

  const handleFocus = (e) => {
    setValues({ ...values, focus: e.target.name });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(creditCardValidator(values));
  };

  return { handleFocus, handleChange, handleSubmit, values, errors };
};
