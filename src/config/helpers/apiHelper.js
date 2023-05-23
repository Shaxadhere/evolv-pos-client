export const prepareData = (data, allowedKeys) => {
    data = Object.keys(data).reduce((obj, key) => {
        if (allowedKeys.includes(key)) {
            obj[key] = data[key]
        }
        return obj
    }, {})
    return data
}