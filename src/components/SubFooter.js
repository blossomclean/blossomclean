import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Social from './Social';

const SubFooter = props => {
  const data = useStaticQuery(graphql`
    query SubFooterQuery {
      configJson {
        footer {
          copyright_text
          rights
          copyright_link
        }
      }
    }
  `);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="sub-footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sub-footer-inner">
              <Social />
              <div className="copyright">
                <span>{data.configJson.footer.copyright_text}</span>
                <span>{year}.</span>
                <span>{data.configJson.footer.rights}</span>
                {data.configJson.footer.copyright_link && (
                  <Link to={data.configJson.footer.copyright_link}>{data.configJson.footer.copyright_link}</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubFooter;
