const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
  ssr: true,
  displayName: true,
});

const getCustomTransformers = () => ({
  before: [styledComponentsTransformer],
});

module.exports = getCustomTransformers;
