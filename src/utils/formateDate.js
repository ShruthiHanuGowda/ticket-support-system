export const formateDate = (date, options) => {
    return new Date(date).toLocaleString(options)
}