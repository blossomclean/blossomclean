import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

const Legal = props => {
  const legal = props.data.legal.edges;
  const { intro } = props.data;

  return (
    <Layout bodyClass="page-legal">
      <SEO title="Legal" />

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
          {legal.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="legal legal-summary legal-summary-large">
                <div className="legal-meta">
                  <h2 className="legal-name">{node.frontmatter.title}</h2>
                  <p className="legal-description">{node.frontmatter.legaltitle}</p>
                </div>
                <div className="legal-content">
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-6 pb-6">
          {legal.filter(edge => (!edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="legal legal-summary">
                <div className="legal-meta">
                  <h2 className="legal-name">{node.frontmatter.title}</h2>
                  <p className="legal-description">{node.frontmatter.legaltitle}</p>
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
  query LegalQuery {
    legal: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/legal\/.*/" } }
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
    intro: markdownRemark(fileAbsolutePath: {regex: "/(legal.md)/"}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Legal;
