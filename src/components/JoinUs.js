import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { JOIN_US } from '../config/validations';
import { useForm } from '../hooks/useForm';
import { MESSAGES } from '../config/messages';
import Contact from './Contact';
import GoogleLogin from './GoogleButton';
import { useGoogleLogout } from 'react-google-login';
import { useCompany } from '../hooks/useCompany';
import UploadFile from './UploadFile';

const JoinUs = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [resume, setResume] = useState('Upload Resume*');
  const [police, setPolice] = useState('Upload Police Check*');
  const [identityProof, setIdentityProof] = useState('Upload Identity Proof*');
  const [contactData, setContactData] = useState({});
  const { companyId } = useCompany();
  const CLIENT_ID = `${process.env.GOOGLE_OAUTH2_CLIENT_ID}`;

  const { signOut } = useGoogleLogout({
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

  const onUpload = (e) => {
    const file = e.target.files[0];
    const name = file.name;
    handleFileUpload(e);
    switch (e.target.id) {
      case 'resume':
        setResume(name);
        break;
      case 'police':
        setPolice(name);
        break;
      case 'identityProof':
        setIdentityProof(name);
        break;
      default:
    }
    files.push(file);
    setFiles([...files]);
  };

  const buildInputs = () => {
    const formData = new FormData();
    formData.append(
      'operations',
      `{ "query": "mutation ($input: MessageInput!) { saveMessage(input: $input) { id } }", 
        "variables": { 
          "input": { 
                "firstName": "${contactData.firstName}",
                "lastName": "${contactData.lastName}",
                "email": "${contactData.email}",
                "phone": "${contactData.phone}",
                "description": "${contactData.enquiry}",
                "address": "${contactData.address}",
                "companyId": ${companyId},
                "files": [null, null, null]
              }
            } 
       }`
    );
    const map = {
      0: ['variables.input.files.0'],
      1: ['variables.input.files.1'],
      2: ['variables.input.files.2'],
    };
    formData.append('map', JSON.stringify(map));

    files.forEach((file, index) => {
      formData.append(`${index}`, file);
    });
    return formData;
  };

  const sendQuery = async () => {
    if (!executeRecaptcha) {
      return;
    }
    const token = await executeRecaptcha('JoinUs');
    const dataInput = buildInputs();
    const result = await axios({
      url: `${process.env.BOOK_NOW_API}/query`,
      method: 'post',
      headers: {
        'Captcha-Token': token,
        'Form-Submit': 'JoinUs',
      },
      data: dataInput,
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

  const {
    handleSubmit,
    handleChange,
    handleSelection,
    handleFileUpload,
    data,
    errors,
  } = useForm({
    validations: JOIN_US,
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
            handleSelection={handleSelection}
            emailReadOnly
          />
          <UploadFile
            id="resume"
            fileName={resume}
            onUpload={onUpload}
            errors={errors}
          />
          <UploadFile
            id="police"
            fileName={police}
            onUpload={onUpload}
            errors={errors}
          />
          <UploadFile
            id="identityProof"
            fileName={identityProof}
            onUpload={onUpload}
            errors={errors}
          />
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
