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
    return nonCommentLines.map(
        (line) => line.replace(/(\=)/, ":").split(":")
        // .map(([k, v]) => ({
        // [k]: v
        // }))
    )
}

module.exports = propertiesToJSON
