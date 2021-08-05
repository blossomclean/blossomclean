import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

const Faqs = props => {
  const faqs = props.data.faqs.edges;
  const { intro } = props.data;

  return (
    <Layout bodyClass="page-faqs">
      <SEO title="FAQs" />

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
          {faqs.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="faqs faqs-summary faqs-summary-large">
                <div className="faqs-meta">
                  <h2 className="faqs-name">{node.frontmatter.title}</h2>
                  <p className="faqs-description">{node.frontmatter.faqstitle}</p>
                </div>
                <div className="faqs-content">
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-6 pb-6">
          {faqs.filter(edge => (!edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="faqs faqs-summary">
                <div className="faqs-meta">
                  <h2 className="faqs-name">{node.frontmatter.title}</h2>
                  <p className="faqs-description">{node.frontmatter.faqstitle}</p>
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
  query FaqsQuery {
    faqs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/faqs\/.*/" } }
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
    intro: markdownRemark(fileAbsolutePath: {regex: "/(faqs.md)/"}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Faqs;
