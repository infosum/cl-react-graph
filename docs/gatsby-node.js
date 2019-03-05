/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({
  actions
}) => {
  console.log('+++++++++ yeah');
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom'),
      }
    }
  })
}