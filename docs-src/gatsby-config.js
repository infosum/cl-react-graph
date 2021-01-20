module.exports = {
  siteMetadata: {
    title: `Infosum Charts`,
    description: `Infosum charts.`,
    author: `@infosum`,
  },
  pathPrefix: "/cl-react-graph",
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#56b4bf`,
        theme_color: `#56b4bf`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        dangerouslyUseGlobalCSS: true,
        theme: {
          palette: {
            primary: {
              main: '#00a97b'
            },
            secondary: {
              main: '#27626a'
            },
          },
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
