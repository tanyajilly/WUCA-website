export const formatDateToLocal = (
    dateStr: string,
    locale: string = "en-US"
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export function isValidUrl(urlString: string) {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
}