import { useState, useEffect } from 'react';
import axios from 'axios';
import contact from '../data/contact/contact.json';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useCompany = () => {
  const [companyId, setCompanyId] = useState(0);
  const [isError, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const setupCompany = async () => {
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
            createCompany(
                input: {
                    name: "${contact.name}"
                    email: "${contact.email}"
                    mobile: "${contact.phone}"
                    residentialAddress: "${contact.residentialAddress}"
                    websiteAddress: "${contact.websiteAddress}" 
                    contactPersonFirstName: "${contact.contactPersonFirstName}"
                    contactPersonLastName: "${contact.contactPersonLastName}"
                    contactPersonEmail: "${contact.contactPersonEmail}"
                    contactPersonPhone: "${contact.contactPersonPhone}"
                    contactPersonAddress: "${contact.contactPersonAddress}"
                }
            ) {
                id
            }
        }`,
      },
    }).catch((error) => {
      if (error?.response?.status === 400) {
        setError(true);
      }
    });
    if (result?.data?.data?.createCompany?.id) {
      setCompanyId(result.data.data.createCompany.id);
    }
  };

  useEffect(() => {
    setupCompany();
  }, [executeRecaptcha]);

  return {
    isError,
    companyId,
  };
};
