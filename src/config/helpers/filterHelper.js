export const getFilters = (facetData) => {
    if (!facetData) return []
    delete facetData.totalResults
    const filters = Object.keys(facetData).map((item) => {
        return {
            title: getFilterLabel(item),
            key: item,
            options: facetData[item],
        }
    })
    return filters
}


export const filterLabelEnum = {
}

export const getFilterLabel = (key) => {
    return filterLabelEnum[key] || "Unrecognized Filter"
}