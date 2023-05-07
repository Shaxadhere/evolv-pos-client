const generateString = (length, onlyCaps = false, onlyNumbers = false) => {
    length = length ? length : 8;
    let charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    if (onlyCaps) {
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (onlyNumbers) {
        charset = "1234567890";
    }
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

export default generateString