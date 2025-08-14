import { getLocalStorage } from "../../utils/storageHelpers";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "../../config/config";

function getInitialLocale() {
  const browserLocale =
    getLocalStorage("locale") || navigator.language.split("-")[0];

  return Object.values(SUPPORTED_LOCALES).includes(browserLocale)
    ? browserLocale
    : DEFAULT_LOCALE;
}

const initialState = {
  locale: getInitialLocale(),
  convoRelatedModal: null,
  convoRelatedDetails: null,
};

export default initialState;
