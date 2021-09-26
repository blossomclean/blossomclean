import { useState } from 'react';
import validator from 'validator';

export const useForm = (options) => {
  const [data, setData] = useState(options.initialValues || {});
  const [errors, setErrors] = useState({});

  const validations = options?.validations;
  let valid = true;
  const newErrors = {};

  const validate = (key, value, validation) => {
    if (validation?.isRequired && validator.isEmpty(value)) {
      valid = false;
      newErrors[key] = validation?.isRequired?.message;
    } else if (value) {
      if (validation?.isAlpha && !validator.isAlpha(value)) {
        valid = false;
        newErrors[key] = validation?.isAlpha?.message;
      }
      if (validation?.isEmail && !validator.isEmail(value)) {
        valid = false;
        newErrors[key] = validation?.isEmail?.message;
      }
      if (validation?.isPhone && !validator.isMobilePhone(value, ['en-AU'])) {
        valid = false;
        newErrors[key] = validation?.isPhone?.message;
      }
      if (
        validation?.maxLength &&
        !validator.isLength(value, {
          min: 0,
          max: validation?.maxLength?.value,
        })
      ) {
        valid = false;
        newErrors[key] = validation?.maxLength?.message;
      }
    }
  };

  const handleChange = (key) => (event) => {
    const value = event?.target?.value;
    const validation = validations[key];
    validate(key, value, validation);
    setData((prevState) => {
      const data = { ...prevState };
      data[key] = value;
      return data;
    });
    if (!valid) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
  };

  const handleSelection = (key) => (event) => {
    let value = '';
    if (key === 'address') {
      value = event.formatted_address || '';
    }
    setData((prevState) => {
      const data = { ...prevState };
      data[key] = value;
      return data;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validations) {
      for (const key in validations) {
        const value = data[key] ? data[key] : '';
        const validation = validations[key];
        validate(key, value, validation);
      }
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    if (options?.onSubmit) {
      await options.onSubmit();
    }

    setErrors({});
  };

  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    handleSelection,
  };
};
