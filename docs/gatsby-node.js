/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({
  actions,
  loaders,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /react-json-view/,
          use: loaders.null(),
        },
      ],
    },
    resolve: {
      alias: {
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      }
    }
  })
}