import commonWebpackConfig, { Configuration } from "./webpack.common";

const config: Configuration = {
  ...commonWebpackConfig,
  mode: "production",
};

export default config;
