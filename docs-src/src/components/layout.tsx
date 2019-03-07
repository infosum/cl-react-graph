import './layout.css';

/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import {
  graphql,
  StaticQuery,
} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Header from './header';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            flexGrow: 2,
            margin: `0 auto`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            width: '100%',
          }}
        >
          <main>{children}</main>

        </div>
        <footer>
          © {new Date().getFullYear()}, Built by
            {` `}
          <a href="https://www.infosum.com">InfoSum</a>
        </footer>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
