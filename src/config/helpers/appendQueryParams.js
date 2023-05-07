const appendQueryParams = (paramsObj) => {
    const paramsArr = []
    Object.keys(paramsObj).forEach(key => {
        if (Array.isArray(paramsObj[key])) {
            paramsObj[key].forEach(paramsVal => {
                paramsArr.push(`${key}[]=${paramsVal}`)
            })
        } else {
            paramsArr.push(`${key}=${paramsObj[key]}`)
        }
    })
    return paramsArr.join("&")
}
export default appendQueryParams