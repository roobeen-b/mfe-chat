const TabScreenSize = 768;

const LOCALES = ["ja", "en"];

const SUPPORTED_LOCALES = {
    ENGLISH: "en",
    JAPANESE: "ja",
};

const DEFAULT_LOCALE = SUPPORTED_LOCALES.ENGLISH;

const TableConfig = {
    defaultPerPage: 10,
    rowsPerPage: [10, 25, 50, 100],
};

const default_timezone = "Asia/Tokyo";
const TIMEZONES = [default_timezone, "Asia/Kathmandu"];

export {
    LOCALES,
    TIMEZONES,
    TableConfig,
    TabScreenSize,
    DEFAULT_LOCALE,
    default_timezone,
    SUPPORTED_LOCALES,
};
