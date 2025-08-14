import { extractFromCookies } from "../../utils";
import { DEFAULT_LOCALE } from "@/config/config";

const getLang = () => extractFromCookies("NEXT_LOCALE") || DEFAULT_LOCALE;

export { getLang };
