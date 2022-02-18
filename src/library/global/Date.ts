export default new class DateLibrary {
    UnixToDate = (unix: number): string => {
        const date = new Date(unix);
        const years = date.getFullYear()
        const months = date.getMonth() + 1
        const days = date.getDate()

        return `${years}/${months < 10 ? `0${months}` : months}/${days < 10 ? `0${days}` : days}`
    }
}