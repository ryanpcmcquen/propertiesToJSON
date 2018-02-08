const fs = require("fs")
const path = require("path")
const filePath = path.join(__dirname, "sample.properties")
const propertiesToJSON = require("./index.js")

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (!err) {
        console.log(propertiesToJSON(data))
    } else {
        console.log(err)
    }
})
