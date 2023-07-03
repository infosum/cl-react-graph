module.exports = (api) => {
  // Cache configuration is a required option
  api.cache(false);

  const presets = [
    "@babel/preset-typescript",
    "@babel/preset-env",
    "@babel/preset-react",
  ];

  return { presets };
};
