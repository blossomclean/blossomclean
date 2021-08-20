import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
export const wrapRootElement = ({ element }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LcgMgYcAAAAAOJzBeVEmJT3791jh-fyLcFoLxEI">
      {element}
    </GoogleReCaptchaProvider>
  );
};
