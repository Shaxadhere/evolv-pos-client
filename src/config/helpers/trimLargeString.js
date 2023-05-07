const trimLargeString = (value="", length=0) => {
    value = value.replace(/<[^>]+>/g, "");
    return value.substring(0, length) + "..."
}

export default trimLargeString