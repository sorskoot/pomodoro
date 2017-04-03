module.exports = {
    context: __dirname + "/src/js",
    entry: "./index",
    output: {
        path: __dirname + "/public/javascripts",
        filename: "bundle.js"
    }
}