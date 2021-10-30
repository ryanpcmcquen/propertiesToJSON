const defaultValue = (v, d) => (v === undefined ? d : v);

const typesMap = {
    false: false,
    true: true,
    undefined: undefined,
    null: null,
};

const defaults = {
    jsonAsString: false,
    convertToJsonTree: false,
    parseNumber: false,
    parseBooleanNullUndefined: false,
};

function isNumeric(value) {
    // https://stackoverflow.com/a/1830844/9740955
    return !isNaN(parseFloat(value)) && isFinite(value);
}

const propertiesToJSON = (str, options = {}) => {
    const parsedOptions = {
        jsonAsString: defaultValue(options.jsonAsString, defaults.jsonAsString),
        convertToJsonTree: defaultValue(
            options.convertToJsonTree,
            defaults.convertToJsonTree
        ),
        parseNumber: defaultValue(options.parseNumber, defaults.parseNumber),
        parseBooleanNullUndefined: defaultValue(
            options.parseBooleanNullUndefined,
            defaults.parseBooleanNullUndefined
        ),
    };
    const jsonObj = str
        // Concat lines that end with '\'.
        .replace(/\\\n( )*/g, '')
        // Split by line breaks.
        .split('\n')
        // Remove commented lines:
        .filter((line) =>
            /(\#|\!)/.test(line.replace(/\s/g, '').slice(0, 1)) ? false : line
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

            let value = colonifiedLine
                .substring(colonifiedLine.search(/(?<!\\):/) + 1)
                .trim();

            if (parsedOptions.parseNumber && isNumeric(value)) {
                value = +value;
            } else if (parsedOptions.parseBooleanNullUndefined) {
                value = value in typesMap ? typesMap[value] : value;
            }

            if (!parsedOptions.convertToJsonTree) {
                obj[key] = value;
                return obj;
            }
            let keys = key.split('.');
            return treeCreationRecursiveFn(keys, value, obj);
        }, {});

    if (parsedOptions.jsonAsString) return JSON.stringify(jsonObj);
    return jsonObj;
};

const treeCreationRecursiveFn = function (keys, value, result) {
    const key = keys[0];
    if (keys.length === 1) {
        result[key] = value;
    } else {
        // case: a=b \n a.c=d then o/p will be a: { '': 'b', c: 'd' } dont want to omit value b as it dont have key
        let obj = { ...(result[key] !== undefined && { '': result[key] }) };
        // since typeof null === "object" we check for null also https://stackoverflow.com/a/8511350/9740955
        if (
            typeof result[key] === 'object' &&
            !Array.isArray(result[key]) &&
            result[key] !== null
        )
            obj = result[key];
        result[key] = treeCreationRecursiveFn(keys.slice(1), value, obj);
    }
    return result;
};

module.exports = propertiesToJSON;
