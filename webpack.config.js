module.exports = {
    context: __dirname + "/src/js",
    entry: "./index",
    devtool: "#source-map",
    output: {
        path: __dirname + "/public/javascripts",
        filename: "bundle.js"
    }
}