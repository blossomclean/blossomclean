import React, { useState } from 'react';
import { VALIDATIONS } from '../config/validations';
import { useForm } from '../hooks/useForm';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { MESSAGES } from '../config/messages';
import Contact from './Contact';
import GoogleLogin from "./GoogleButton";

const JoinUs = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [resume, setResume] = useState('Upload Resume');
  const [police, setPolice] = useState('Upload Police Check');

  const uploadFile = (e) => {
    const name = e.target.files[0].name;
    switch (e.target.id) {
      case 'resume':
        setResume(name);
        break;
      case 'police':
        setPolice(name);
        break;
      default:
        setResume(resume);
        setPolice(police);
    }
  };

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
          <GoogleLogin />
          <div>&nbsp;</div>
          <Contact data={data} errors={errors} handleChange={handleChange} />
          <div className="input-group">
            <div className="upload">
              <label class="upload-button" for="resume">
                {resume}
                <input
                  accept=".doc,.docx,.pdf"
                  id="resume"
                  type="file"
                  onChange={uploadFile}
                />
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="upload">
              <label class="upload-button" for="police">
                {police}
                <input
                  accept=".doc,.docx,.pdf"
                  id="police"
                  type="file"
                  onChange={uploadFile}
                />
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="upload">
              <label class="upload-button" for="police">
                Identity Proof*
                <input
                  accept=".doc,.docx,.pdf"
                  id="police"
                  type="file"
                  onChange={uploadFile}
                />
              </label>
            </div>
          </div>
          <div className="input-group">
            <textarea
              name="message"
              value={data.enquiry || ''}
              onChange={handleChange('message')}
              className="form-control"
              placeholder="Tell us about your self"
              required
            />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>
          <div className="enquiry-footer">
            <input
              className="button button-primary"
              type="submit"
              value="Join Us"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default JoinUs;
