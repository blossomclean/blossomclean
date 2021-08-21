import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const Call = props => {
  const data = useStaticQuery(graphql`
    query ContactQuery {
        contactJson {
          phone
          email
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
          </div>
        )}
      </div>
      {props.showButton && (
        <div className="call-box-bottom">
          <Link className="button button-primary" to="/contact/">Contact</Link>
        </div>
      )}
    </div>
  );
};

export default Call;
