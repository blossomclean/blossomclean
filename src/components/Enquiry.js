import React, { useState } from 'react';
import { VALIDATIONS } from '../config/validations';
import { useForm } from '../hooks/useForm';
import { useCompany } from '../hooks/useCompany';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { MESSAGES } from '../config/messages';
import Contact from './Contact';

const Enquiry = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isError, companyId } = useCompany();

  const sendQuery = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('Enquiry');
    const result = await axios({
      url: `${process.env.BOOK_NOW_API}/query`,
      method: 'post',
      headers: {
        'Captcha-Token': token,
        'Form-Submit': 'Enquiry',
      },
      data: {
        query: `mutation {
          saveMessage(
              input: {
                  firstName: "${data['firstName']}"
                  lastName: "${data['lastName']}"
                  email: "${data['email']}"
                  phone: "${data['phone']}"
                  description: "${data['enquiry']}"
                  address: "${data['address']}"
                  companyId: ${companyId}
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
    if (result?.data?.data?.saveMessage?.id) {
      setMessage(MESSAGES.THANKYOU);
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
          <Contact data={data} errors={errors} handleChange={handleChange} />
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
