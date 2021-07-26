import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Call = props => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
        contactJson {
          phone
          email
          image
          image_alt_text
          qrcode_height
          contact_button_link
        }
    }
   `);
  return (
    <div className="call">
      <div className="call-box-top">
        {data.contactJson.phone && (
          <div className="call-phone">
            <strong>Phone: </strong>
            {' '}
            { data.contactJson.phone }
            {' '}
          </div>
        )}
        {data.contactJson.email && (
          <div className="call-phone">
            <strong>Email: </strong>
            <a href={`mailto:${data.contactJson.email}`}>
              {data.contactJson.email}
            </a>
          </div>
        )}
        {data.contactJson.phone && (
          <div className="call-phone">
            <strong>FB QRCode: </strong>
            {' '}
            <img height={data.contactJson.qrcode_height} alt={data.contactJson.image_alt_text} src={data.contactJson.image} />
            {' '}
          </div>
        )}
      </div>
      {props.showButton && (
        <div className="call-box-bottom">
          <a href={data.contactJson.contact_button_link} className="button">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Call;
