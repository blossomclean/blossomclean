import React, { useState } from 'react';
import { VALIDATIONS } from '../config/validations';
import { useForm } from '../hooks/useForm';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { MESSAGES } from '../config/messages';

const Enquiry = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const sendQuery = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('Enquiry');
    if (true) {
      const result = await axios({
        url: `${process.env.BOOK_NOW_API}/query`,
        method: 'post',
        headers: {
          'Captcha-Token': token,
        },
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
      }).catch((error) => {
        if (error?.response?.status === 400) {
          setError(true);
          setMessage(error.response.data);
        }
      });
      if (result?.data?.data?.createLead?.id) {
        setMessage(MESSAGES.THANKYOU);
      }
    }
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: VALIDATIONS.ENQUIRY,
    onSubmit: sendQuery,
  });

  return (
    <>
      {message ? (
        <div className="enquiry-form">
          <span className={`thank-you ${error ? 'error' : ''}`}>{message}</span>
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
