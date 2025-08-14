import { DEFAULT_LOCALE, TIMEZONES } from "../config/config";
import { getLang } from "../translations/utils/getLang";
import {
    dayNamesFullEN,
    dayNamesFullJP,
    dayNamesShortEN,
    dayNamesShortJP,
    monthNamesFullEN,
    monthNamesFullJP,
    monthNamesShortEN,
    monthNamesShortJP,
} from "./parseDateConst";

function formatDate(dateString, format = "YYYY-MM-DD", lang = getLang()) {
    const date = dateString ? new Date(dateString) : new Date();

    const padZero = (value) => `0${value}`.slice(-2);

    const dayIndex = date.getDay();
    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    const dayNamesFull =
        lang === DEFAULT_LOCALE ? dayNamesFullJP : dayNamesFullEN;
    const dayNamesShort =
        lang === DEFAULT_LOCALE ? dayNamesShortJP : dayNamesShortEN;
    const monthNamesFull =
        lang === DEFAULT_LOCALE ? monthNamesFullJP : monthNamesFullEN;
    const monthNamesShort =
        lang === DEFAULT_LOCALE ? monthNamesShortJP : monthNamesShortEN;

    const formattedDate = format
        .replace("YYYY", year.toString())
        .replace("a", date.getHours() < 12 ? "AM" : "PM")
        .replace("MMMM", monthNamesFull[monthIndex])
        .replace("MMM", monthNamesShort[monthIndex])
        .replace("MM", padZero(monthIndex + 1))
        .replace("dddd", dayNamesFull[dayIndex])
        .replace("ddd", dayNamesShort[dayIndex])
        .replace("DD", padZero(date.getDate()))
        .replace("hh", padZero(date.getHours()))
        .replace("HH", padZero(date.getHours() % 12 || 12))
        .replace("mm", padZero(date.getMinutes()))
        .replace("ss", padZero(date.getSeconds()));
    return formattedDate;
}

/**
 * Checks if a given date falls between two other dates.
 * @param date The date to check.
 * @param startDate The start date of the range.
 * @param endDate The end date of the range.
 * @returns True if the date falls between the start and end dates, false otherwise.
 */
function isDateInRange(date = new Date(), startDate, endDate) {
    const rangeEnd = new Date(endDate);
    const providedDate = new Date(date);
    const rangeStart = new Date(startDate);
    return providedDate >= rangeStart && providedDate <= rangeEnd;
}

function adjustDate(options) {
    const { dateString = "", amount, adjustPart = "m", add = false } = options;
    const date = dateString ? new Date(dateString) : new Date();
    const a = (add ? 1 : -1) * amount;

    const methodsMap = {
        y: (d) => d.setFullYear(d.getFullYear() + a),
        m: (d) => d.setMonth(d.getMonth() + a),
        w: (d) => d.setDate(d.getDate() + a * 7),
        d: (d) => d.setDate(d.getDate() + a),
        t: (d) => d.setTime(d.getTime() + a * 60 * 1000),
    };

    methodsMap[adjustPart](date);
    return date;
}

/**
 * Compares two dates and returns whether they are the same, before, or after each other.
 * If no dates are provided, it defaults to using today's date.
 *
 * @param date1 The first date to compare (optional)
 * @param date2 The second date to compare (optional)
 * @returns A string indicating whether the dates are the same, before, or after each other
 */
function compareDates(
    date1 = new Date(),
    date2 = new Date(),
    compareBy = "day"
) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (compareBy === "day") {
        if (d1.toDateString() === d2.toDateString()) {
            return "isSame";
        } else if (d1 < d2) {
            return "isBefore";
        } else if (d1 > d2) {
            return "isAfter";
        } else return "-";
    } else if (compareBy === "minute") {
        if (d1.getTime() === d2.getTime()) {
            return "isSame";
        } else if (d1 < d2) {
            return "isBefore";
        } else if (d1 > d2) {
            return "isAfter";
        } else return "-";
    } else {
        throw new Error("Invalid comparison type. Use 'day' or 'minute'.");
    }
}

function formatDateLang(
    dateString,
    locale = navigator.language,
    options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    }
) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(locale, options);
    return formattedDate;
}

const calculateTimeDifference = (dateString) => {
    const currentTime = new Date();
    const targetDate = new Date(dateString);
    const timeDifference = targetDate.getTime() - currentTime.getTime();

    if (timeDifference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

const dateDifferenceInDays = (date1 = new Date(), date2 = new Date()) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const timeDifferenceInMilliseconds = d1.getTime() - d2.getTime();
    const daysDifference = timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.round(daysDifference);
};

const dateDifferenceInMinutes = (date1 = new Date(), date2 = new Date()) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the absolute difference in milliseconds
    const timeDifferenceInMilliseconds = Math.abs(d1.getTime() - d2.getTime());
    const minutesDifference = timeDifferenceInMilliseconds / (1000 * 60);

    return Math.round(minutesDifference);
};

const defaultRelativeTimeFormatOptions = {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "long",
};
/**
 * Formats the relative time based on the difference in seconds.
 * @param diffInSeconds The time difference in seconds.
 * @param lang The language code (e.g., "en", "jp").
 * @param options Optional Intl.RelativeTimeFormatOptions to customize formatting.
 * @returns The formatted relative time string.
 */
const formatRelativeTime = (
    lang,
    diffInSeconds,
    options = defaultRelativeTimeFormatOptions
) => {
    const l = lang === "jp" ? "ja" : "en";
    const rtf = new Intl.RelativeTimeFormat(l, options);

    const timeUnits = [
        { unit: "second", threshold: 60, divisor: 1 },
        { unit: "minute", threshold: 3600, divisor: 60 },
        { unit: "hour", threshold: 86400, divisor: 3600 },
        { unit: "day", threshold: 604800, divisor: 86400 },
        { unit: "week", threshold: 31536000, divisor: 604800 },
        { unit: "year", threshold: Infinity, divisor: 31536000 },
    ];

    for (const { unit, threshold, divisor } of timeUnits) {
        if (diffInSeconds < threshold) {
            const value = Math.floor(diffInSeconds / divisor);
            return rtf.format(-value, unit);
        }
    }

    return ""; // Fallback, though it won't be reached.
};

/**
 * Gets the relative time string for a given date.
 * @param dateString The date string to compare to now.
 * @param lang The language code (e.g., "en", "jp").
 * @param options Optional Intl.RelativeTimeFormatOptions to customize formatting.
 * @returns The formatted relative time string.
 */
const getRelativeTime = (
    dateString,
    lang = getLang(),
    options = defaultRelativeTimeFormatOptions
) => {
    const now = new Date();
    const date = dateString ? new Date(dateString) : new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    return formatRelativeTime(lang, diffInSeconds, options);
};

const getLocaleTimezone = (date = new Date(), lang = getLang()) => {
    const d = new Date(date);
    const timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || lang === "en"
            ? TIMEZONES[1]
            : TIMEZONES[0];

    const formattedDate = d.toLocaleString("en-US", {
        timezone,
    });

    return formatDate(formattedDate, "ddd, MMM DD YYYY, HH:mm a");
    // console.log({ f, formattedDate, timezone });
    // Get the user's local time zone offset in minutes
    // const timeZoneOffset = d.getTimezoneOffset();

    // // Create a new Date object with the UTC time adjusted for the local time zone offset
    // const localDate = new Date(d.getTime() + timeZoneOffset * 60000);

    // return localDate;
};

const formatRelativeDate = (timestamp, options) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 1 || options?.onlyTime) {
        return formatDate(date, "HH:mm a");
    } else if (diffDays < 7) {
        return formatDate(date, "ddd, HH:mm a");
    } else if (diffDays < 365) {
        return formatDate(date, "ddd, MMM DD, HH:mm a");
    } else {
        return formatDate(date, "MMM DD YYYY, HH:mm a");
    }
};

export const getDateFormat = (date = new Date(), isJ = false) => {
    return formatDate(
        date,
        isJ ? "YYYY年MMMDD日 HH時mm分" : "YYYY MMM DD HH:mm"
    );
};
export const getDateFormatDateTime = (date = new Date(), isJ = false) => {
    return {
        date: formatDate(date, isJ ? "YYYY年MMMDD日" : "YYYY MMM DD"),
        time: formatDate(date, isJ ? "HH時mm分" : "HH:mm"),
    };
};
export const getDateFormatNT = (date = new Date(), isJ = false) => {
    return formatDate(date, isJ ? "YYYY年MMMDD日" : "YYYY MMM DD");
};
export const getDateFormatCalendar = (date = new Date(), isJ = false) => {
    return formatDate(
        date,
        isJ ? "YYYY年MMMDD日 (dddd)" : "DD MMMM YYYY, dddd"
    );
};

export const getDateCalendar = (date = new Date(), isJ = false) => {
    return formatDate(date, isJ ? "YYYY年MMM" : "YYYY MMM");
};

export const getDateCalendarMeeting = (date = new Date(), isJ = false) => {
    return formatDate(
        date,
        isJ ? "YYYY年MMMDD日HH時mm分" : "HH:mm, DD MMM YYYY"
    );
};
export const getDateOccurringDate = (date = new Date(), isJ = false) => {
    return formatDate(date, isJ ? "YYYY年MMMDD日" : "DD MMM, YYYY");
};

export const getTimezone = (timeZone) => {
    if (timeZone) {
        switch (true) {
            case timeZone.includes("Kathmandu"):
                return "Asia/Kathmandu";
            case timeZone.includes("Tokyo") || timeZone.includes("Japan"):
                return "Asia/Tokyo";
            default:
                return "Asia/Tokyo";
        }
    }
    return "Asia/Tokyo";
};

export const getDateAndTime = (d, t, l = "jp") => {
    return formatDate(
        `${d}T${t}`,
        l === "en" ? "YYYY MMM DD HH:mm" : "YYYY年MMMDD日HH時mm分"
    );
};

export {
    formatDate,
    adjustDate,
    compareDates,
    isDateInRange,
    formatDateLang,
    getRelativeTime,
    getLocaleTimezone,
    formatRelativeDate,
    dateDifferenceInDays,
    calculateTimeDifference,
    dateDifferenceInMinutes,
};
