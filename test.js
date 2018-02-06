const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "sample.properties");
const parseProperties = require("./index.js");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (!err) {
        console.log(parseProperties(data));
    } else {
        console.log(err);
    }
});
