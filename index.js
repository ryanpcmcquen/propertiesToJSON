const propertiesToJSON = (str) => {
    const lines = str.replace(/\\\n/, "").split("\n")
    return lines
        .filter(
            (line) =>
                line
                    .replace(/\s/g, "")
                    .slice(0, 1)
                    .match(/(\#|\!)/)
                    ? false
                    : line
        )
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
}

module.exports = propertiesToJSON
