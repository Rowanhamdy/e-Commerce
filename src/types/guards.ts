const isString = (value: unknown) : value is string => { // khale altype ale rage3 ykon string
    return typeof value === "string";
}
export {isString}