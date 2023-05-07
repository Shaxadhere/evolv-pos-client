export const queryStringToObject = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params
}

export const fetchQueryString = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams
}

export const appendQueryParams = ({ paramsObj, currentQuery = false }) => {
    const paramsArr = []
    if (currentQuery) {
        const currentParams = queryStringToObject()
        Object.keys(currentParams).forEach(key => {
            if (Array.isArray(currentParams[key])) {
                if (paramsObj[key] === "") {
                    delete paramsObj[key]
                }
                else {
                    currentParams[key].forEach(paramsVal => {
                        paramsArr.push(`${key}[]=${paramsVal}`)
                    })
                }
            } else {
                if (paramsObj[key] === "") {
                    delete paramsObj[key]
                }
                else {
                    paramsArr.push(`${key}=${currentParams[key]}`)
                }
            }
        })
    }
    else {
        Object.keys(paramsObj).forEach(key => {
            if (Array.isArray(paramsObj[key])) {
                if (paramsObj[key] === "") {
                    delete paramsObj[key]
                }
                else {
                    paramsObj[key].forEach(paramsVal => {
                        paramsArr.push(`${key}[]=${paramsVal}`)
                    })
                }
            } else {
                if (paramsObj[key] === "") {
                    delete paramsObj[key]
                }
                else {
                    paramsArr.push(`${key}=${paramsObj[key]}`)
                }
            }
        })
    }
    return paramsArr.join("&")
}

export const makeInitialQueryObject = ({ injectParams, currentQuery = false, prepareQueryString = false }) => {
    const params = queryStringToObject()
    let query = {}
    Object.keys(params).forEach(key => {
        if (params[key] !== "") {
            query[key] = params[key]
        }
    })
    if (currentQuery) {
        Object.keys(params).forEach(key => {
            query[key] = params[key]
        })
    }
    if (injectParams) {
        Object.keys(injectParams).forEach(key => {
            query[key] = injectParams[key]
        })
    }
    if (prepareQueryString) {
        return appendQueryParams({ paramsObj: query })
    }
    return query
}