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
    statuses: "Status",
    createdBy: "Created By",
    updatedBy: "Updated By",
    qualifications:"Qualification",
    teachers:"Teacher",
    courses:"Course",
    cohorts:"Cohort",
    roles:"Role",
    chapters:"Chapter",
    itemEntityNames:"Item Type",
}

export const getFilterLabel = (key) => {
    return filterLabelEnum[key] || "Unrecognized Filter"
}