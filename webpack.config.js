// this file contains all the details we need for bundling, such as the entry point, the output destination, and anything like plugins and loaders
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js", // the file path from the config file to whichever file is the entry point
    output: { //object containing info about output bundle
        filename: "main.js", //output bundle
        path: path.resolve(__dirname, "dist"),
        clean: true, // This helps us keep dist clean, so it only contains the files produced by the most recent bundling bc it will empty the output directory first before bundling the files into it.
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/template.html"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },            
        ],
    },
};
// to run webpack: npx webpack
