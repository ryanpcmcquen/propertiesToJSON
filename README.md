Convert Java `.properties` files to JSON (using JavaScript).

The function `propertiesToJSON` takes a string as input and returns
a JavaScript object.

### Example:

```js
const props = propertiesToJSON(data)
console.log(props)
// Gives the entire properties file
// as one JavaScript object.
console.log(props.website)
// Accesses the 'website' key from
// that file (returning its value).
```

### How do I get it?

```
yarn add properties-to-json
```

Profit.
