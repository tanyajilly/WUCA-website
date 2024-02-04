export const formatDateToLocal = (
    dateStr: string,
    locale: string = "en-GB"
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

export const formatTimeToLocal = (timeStr: string | null) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":");

    // Convert hours to a number to easily manipulate and check AM/PM
    let hoursNumeric = parseInt(hours, 10);
    const amPm = hoursNumeric >= 12 ? "PM" : "AM";

    // Adjust hours to 12-hour format
    hoursNumeric = hoursNumeric % 12;
    hoursNumeric = hoursNumeric === 0 ? 12 : hoursNumeric; // Convert "00" to "12"

    // Ensure hours are formatted as two digits
    const formattedHours = hoursNumeric.toString().padStart(2, "0");

    // Construct the formatted time string
    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

    return formattedTime;
};

export function isValidUrl(urlString: string) {
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
}
