import commonWebpackConfig, { Configuration } from "./webpack.common";

const config: Configuration = {
  ...commonWebpackConfig,
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    client: {
      overlay: true, // shows overlay in browser in dev when there are compiler errors/warnings
    },
    hot: true, // hot reload
    historyApiFallback: { index: "/" },
    port: 3000, // starts the webpack server at this port number
    compress: true, // enable gzip compression for everything served
  },
};

export default config;
