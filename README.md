Convert Java `.properties` files to JSON (using JavaScript).

The function `propertiesToJSON` takes a string and returns
a JavaScript object.

### Read a local file in `node`:

```js
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "sample.properties");
const propertiesToJSON = require("properties-to-json");

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (!err) {
        console.log(propertiesToJSON(data));
    }
});
```

### Read a remote file in the browser:

```js
const propertiesToJSON = require("properties-to-json");

const propsFile = new Request(
    "https://gitcdn.link/repo/ryanpcmcquen/propertiesToJSON/master/sample.properties"
);

const props = fetch(propsFile)
    .then((response) => {
        return response.text();
    })
    .then((text) => {
        const propsText = propertiesToJSON(text);
        console.log(propsText);
        return propsText;
    });
```

### How do I get it?

1. `yarn add properties-to-json`
2. Profit.
