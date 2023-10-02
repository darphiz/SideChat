const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: "Side Chat",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}

module.exports = {
  entry: {
    sidepanel: path.resolve("src/sidepanel/index.jsx"),
    "service-worker": path.resolve("src/serviceworker/service-worker.js"),
    settings: path.resolve("src/settings/index.jsx")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),

    ...getHtmlPlugins(
        ["sidepanel", "settings"]
        ),
  ],
  resolve: {
    extensions: [".jsx", ".js", ".css", ".otf"],
  },
};
