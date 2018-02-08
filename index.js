const propertiesToJSON = (str) => {
    const lines = str.replace(/\\\n/, "").split("\n")
    const nonCommentLines = lines.filter(
        (line) =>
            line
                .replace(/\s/g, "")
                .slice(0, 1)
                .match(/(\#|\!)/)
                ? false
                : line
    )
    return nonCommentLines.map((line) =>
        line
            .replace(/(\=)/, ":")
            .split(":")
            .reduce((obj, arr) => {
                console.log(arr)
                obj[arr[0]] = arr[1]
                return obj
            }, {})
    )
}

module.exports = propertiesToJSON
