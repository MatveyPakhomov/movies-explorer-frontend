import React, { useCallback } from "react";

//хук управления формой
export function useForm() {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    if (
      target.id === "name" &&
      target.validationMessage === "Введите данные в указанном формате."
    ) {
      setErrors({
        ...errors,
        name: "Имя должно содержать только латиницу, кириллицу, пробел или дефис.",
      });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (event) => {
    const target = event.target;
    const isValid = target.closest("form").checkValidity();
    if (!isValid) {
      setErrors({ ...errors, name: "Нужно ввести ключевое слово." });
      return;
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, handleSubmit, errors, isValid, resetForm };
}
