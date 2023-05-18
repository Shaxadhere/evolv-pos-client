export const makeSelectList = (array, value="_id", label="name") => {
    return array?.map((item) => {
        return {
            value: item[value],
            label: item[label],
        }
    })
}