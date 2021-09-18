import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { VALIDATIONS } from '../config/validations';
import { useForm } from '../hooks/useForm';
import { MESSAGES } from '../config/messages';
import Contact from './Contact';
import GoogleLogin from './GoogleButton';
import { useGoogleLogout } from 'react-google-login';
import { useCompany } from '../hooks/useCompany';

const JoinUs = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [resume, setResume] = useState('Upload Resume');
  const [police, setPolice] = useState('Upload Police Check');
  const [contactData, setContactData] = useState({});
  const { isError, companyId } = useCompany();
  const CLIENT_ID = `${process.env.GOOGLE_OAUTH2_CLIENT_ID}`;

  const { signOut, loaded } = useGoogleLogout({
    jsSrc: '',
    onFailure: () => {},
    clientId: CLIENT_ID,
    cookiePolicy: 'single_host_origin',
    loginHint: '',
    hostedDomain: '',
    fetchBasicProfile: true,
    discoveryDocs: '',
    uxMode: '',
    redirectUri: '',
    scope: '',
    accessType: '',
    onLogoutSuccess: () => {},
  });

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
    const token = await executeRecaptcha('JoinUs');
    const result = await axios({
      url: `${process.env.BOOK_NOW_API}/query`,
      method: 'post',
      headers: {
        'Captcha-Token': token,
        'Form-Submit': 'JoinUs',
      },
      data: {
        query: `mutation {
          saveMessage(
              input: {
                  firstName: "${contactData.firstName}"
                  lastName: "${contactData.lastName}"
                  email: "${contactData.email}"
                  phone: "${contactData.phone}"
                  description: "${contactData.enquiry}"
                  address: "${contactData.address}"
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
      signOut();
    }
  };

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: VALIDATIONS.ENQUIRY,
    onSubmit: sendQuery,
  });

  const setGoogleUserInfo = (userInfo) => {
    data.firstName = userInfo.firstName;
    data.lastName = userInfo.lastName;
    data.email = userInfo.email;
    setContactData({ ...data });
  };

  useEffect(() => {
    setContactData({ ...contactData, ...data });
  }, [data]);

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
          <GoogleLogin setGoogleUserInfo={setGoogleUserInfo} />
          <div>&nbsp;</div>
          <Contact
            data={contactData}
            errors={errors}
            handleChange={handleChange}
            emailReadOnly
          />
          <div className="input-group">
            <div className="upload">
              <label className="upload-button" htmlFor="resume">
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
              <label className="upload-button" htmlFor="police">
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
              <label className="upload-button" htmlFor="police">
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
              name="enquiry"
              value={data.enquiry || ''}
              onChange={handleChange('enquiry')}
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
