const propertiesToJSON = (str) =>
    str
        // Concat lines that end with '/'.
        .replace(/\\\n/, "")
        // Split by line breaks.
        .split("\n")
        // Remove commented lines:
        .filter(
            (line) =>
                /(\#|\!)/.test(line.replace(/\s/g, "").slice(0, 1))
                    ? false
                    : line
        )
        // Create the JSON:
        .reduce((obj, line) => {
            const colonifiedLine = line.replace(/(\=)/, ":")
            const key = colonifiedLine
                .substring(0, colonifiedLine.indexOf(":"))
                .trim()
            const value = colonifiedLine
                .substring(colonifiedLine.indexOf(":") + 1)
                .trim()
            obj[key] = value
            return obj
        }, {})

module.exports = propertiesToJSON
