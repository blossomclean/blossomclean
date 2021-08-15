import React, { useState } from 'react';
import { VALIDATIONS } from '../config/validations';
import { useForm } from '../hooks/useForm';
import axios from 'axios';

const Enquiry = () => {
  const [sendEnquiry, setSendEnquiry] = useState(false);

  const sendQuery = async () => {
    const result = await axios({
      url: 'http://localhost:8080/query',
      method: 'post',
      data: {
        query: `mutation {
          createLead(
              input: {
                  firstName: "${data['firstName']}"
                  lastName: "${data['lastName']}"
                  email: "${data['email']}"
                  phone: "${data['phone']}"
                  description: "${data['enquiry']}"
              }
          ) {
              id
          }
      }`,
      },
    });
    if (result?.data?.data?.createLead?.id) {
      setSendEnquiry(true);
    }
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: VALIDATIONS.ENQUIRY,
    onSubmit: sendQuery,
  });

  return (
    <>
      {sendEnquiry ? (
        <div className="enquiry-form">
          <span className="thank-you">
            Thanks for sending us your enquiry. We strive to process all
            enquiries within 48 hours. One of our team member will reach out
            shortly on the contact details you have filled in the enquiry.
          </span>
        </div>
      ) : (
        <form
          className="enquiry-form"
          onSubmit={handleSubmit}
          noValidate="noValidate"
        >
          <div className="input-group">
            <input
              type="text"
              name="firstName"
              value={data.firstName || ''}
              onChange={handleChange('firstName')}
              className={`form-control ${errors.firstName && 'input-error'}`}
              placeholder="First Name*"
              required
            />
            {errors.firstName && (
              <div className="error">{errors.firstName}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="lastName"
              value={data.lastName || ''}
              onChange={handleChange('lastName')}
              className={`form-control ${errors.lastName && 'input-error'}`}
              placeholder="Last Name*"
              required
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={data.email || ''}
              onChange={handleChange('email')}
              className={`form-control ${errors.email && 'input-error'}`}
              placeholder="Email*"
              required
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="phone"
              value={data.phone || ''}
              onChange={handleChange('phone')}
              className={`form-control ${errors.phone && 'input-error'}`}
              placeholder="Phone*"
              required
            />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </div>
          <div className="input-group">
            <textarea
              name="enquiry"
              value={data.enquiry || ''}
              onChange={handleChange('enquiry')}
              className="form-control"
              placeholder="Enquiry"
              required
            />
            {errors.enquiry && <div className="error">{errors.enquiry}</div>}
          </div>
          <div className="enquiry-footer">
            <input
              className="button button-primary"
              type="submit"
              value="Send enquiry"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Enquiry;
