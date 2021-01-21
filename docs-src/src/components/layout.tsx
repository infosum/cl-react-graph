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
import React, {
  FC,
  useState,
} from 'react';

import { DrawerComponent } from './Drawer';
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
    render={(data) => <App data={data}>{children}</App>}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const App: FC<{ data: any }> = ({
  data,
  children,
}) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title}
        openDrawerHandler={() => {
          setOpen(true);
        }} />
      <div
        style={{
          flexGrow: 2,
          margin: `0 auto`,

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
      <DrawerComponent
        isOpen={isOpen}
        toggleDrawerHandler={() => setOpen(!isOpen)} />
    </>
  )
}
