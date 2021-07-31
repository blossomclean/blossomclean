import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

const Cancellation = props => {
  const cancellation = props.data.cancellation.edges;
  const { intro } = props.data;

  return (
    <Layout bodyClass="page-cancellation">
      <SEO title="Cancellation" />

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
          {cancellation.filter(edge => (edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="cancellation cancellation-summary cancellation-summary-large">
                <div className="cancellation-meta">
                  <h2 className="cancellation-name">{node.frontmatter.title}</h2>
                  <p className="cancellation-description">{node.frontmatter.cancellationtitle}</p>
                </div>
                <div className="cancellation-content">
                  <p>{node.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row pt-6 pb-6">
          {cancellation.filter(edge => (!edge.node.frontmatter.promoted)).map(({ node }) => (
            <div key={node.id} className="col-12 col-md-6 mb-2">
              <div className="cancellation cancellation-summary">
                <div className="cancellation-meta">
                  <h2 className="cancellation-name">{node.frontmatter.title}</h2>
                  <p className="cancellation-description">{node.frontmatter.cancellationtitle}</p>
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
  query CancellationQuery {
    cancellation: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/cancellation\/.*/" } }
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
    intro: markdownRemark(fileAbsolutePath: {regex: "/(cancellation.md)/"}) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Cancellation;
