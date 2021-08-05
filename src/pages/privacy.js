import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

const Privacy = props => {
  const privacy = props.data.privacy.edges;
  const { intro } = props.data;

  return (
    <Layout bodyClass="page-privacy">
      <SEO title="Privacy" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {privacy.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="privacy privacy-summary privacy-summary-large">
                <div className="privacy-meta">
                  <h2 className="privacy-name">{node.frontmatter.title}</h2>
                  <p className="privacy-description">{node.frontmatter.privacytitle}</p>
                </div>
                <div className="privacy-content">
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-6 pb-6">
          {privacy.filter(edge => (!edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="privacy privacy-summary">
                <div className="privacy-meta">
                  <h2 className="privacy-name">{node.frontmatter.title}</h2>
                  <p className="privacy-description">{node.frontmatter.privacytitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export const query = graphql`
  query PrivacyQuery {
    privacy: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/privacy\/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            promoted
          }
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: {regex: "/(privacy.md)/"}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Privacy;
