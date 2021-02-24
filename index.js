const propertiesToJSON = (str) => {
    return (
        str
            // Concat lines that end with '\'.
            .replace(/\\\n( )*/g, '')
            // Split by line breaks.
            .split('\n')
            // Remove commented lines:
            .filter((line) =>
                /(\#|\!)/.test(line.replace(/\s/g, '').slice(0, 1))
                    ? false
                    : line
            )
            // Create the JSON:
            .reduce((obj, line) => {
                // Replace only '=' that are not escaped with '\' to handle separator inside key
                const colonifiedLine = line.replace(/(?<!\\)=/, ':');
                const key = colonifiedLine
                    // Extract key from index 0 to first not escaped colon index
                    .substring(0, colonifiedLine.search(/(?<!\\):/))
                    // Remove not needed backslash from key
                    .replace(/\\/g, '')
                    .trim();
                const value = colonifiedLine
                    .substring(colonifiedLine.search(/(?<!\\):/) + 1)
                    .trim();
                obj[key] = value;
                return obj;
            }, {})
    );
};

module.exports = propertiesToJSON;
