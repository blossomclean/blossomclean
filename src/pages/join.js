import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import JoinUs from '../components/JoinUs';

const Join = (props) => {
  const join = props.data.join.edges;
  const { intro } = props.data;

  return (
    <Layout bodyClass="page-joins">
      <SEO title="Join" />

      <div className="intro">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-12 order-2 order-md-1">
              <div dangerouslySetInnerHTML={{ __html: intro.html }} />
            </div>
            <div className="col-12 order-2 order-md-1">
              <JoinUs />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query JoinQuery {
    join: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/join/.*/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
        }
      }
    }
    intro: markdownRemark(fileAbsolutePath: { regex: "/(join.md)/" }) {
      html
    }
  }
`;

export default Join;
