export const makeSelectList = (array, value="id", label="name") => {
    return array?.map((item) => {
        return {
            value: item[value],
            label: item[label],
        }
    })
}