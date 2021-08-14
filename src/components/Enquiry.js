import React, { useState } from "react";
import { useForm } from "../hooks/useForm";

const Enquiry = () => {
  const validations = {
    firstName: {
      isRequired: {
        value: true,
        message: "First Name is required",
      },
      isAlpha: {
        message: "You're not allowed to enter special characters and numbers",
      },
      maxLength: {
        value: 25,
        message: "First Name max length is 25",
      },
    },
    lastName: {
      isRequired: {
        value: true,
        message: "Last Name is required",
      },
      isAlpha: {
        message: "You're not allowed to enter special characters and numbers",
      },
      maxLength: {
        value: 25,
        message: "Last Name max length is 25",
      },
    },
    email: {
      isRequired: {
        value: true,
        message: "Email is required",
      },
      isEmail: {
        message: "Email address is invalid",
      },
      maxLength: {
        value: 50,
        message: "Email max length is 50",
      },
    },
    phone: {
      isRequired: {
        value: true,
        message: "Phone number is required",
      },
      isPhone: {
        message: "Phone number is invalid",
      },
      maxLength: {
        value: 12,
        message: "Phone max length is 12",
      },
    },
  };
  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: validations,
  });

  return (
    <form
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate="noValidate"
    >
      <div className="input-group">
        <div>
          <input
            type="text"
            name="firstName"
            value={data.firstName || ""}
            onChange={handleChange("firstName")}
            className={`form-control ${errors.firstName && "input-error"}`}
            placeholder="First Name*"
            required
          />
        </div>
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>
      <div className="input-group">
        <input
          type="text"
          name="lastName"
          value={data.lastName || ""}
          onChange={handleChange("lastName")}
          className={`form-control ${errors.lastName && "input-error"}`}
          placeholder="Last Name*"
          required
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>
      <div className="input-group">
        <input
          type="email"
          name="email"
          value={data.email || ""}
          onChange={handleChange("email")}
          className={`form-control ${errors.email && "input-error"}`}
          placeholder="Email*"
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="input-group">
        <input
          type="text"
          name="phone"
          value={data.phone || ""}
          onChange={handleChange("phone")}
          className={`form-control ${errors.phone && "input-error"}`}
          placeholder="Phone*"
          required
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>
      <div className="input-group">
        <textarea
          name="enquiry"
          className="form-control"
          placeholder="Enquiry"
          required
        />
      </div>
      <div className="enquiry-footer">
        <input
          className="button button-primary"
          type="submit"
          value="Send enquiry"
        />
      </div>
    </form>
  );
};

export default Enquiry;
