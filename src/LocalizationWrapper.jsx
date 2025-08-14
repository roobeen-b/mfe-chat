import { Toaster } from "sonner";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";
import { useState, useEffect } from "react";

import "./styles/globals.css";

import { localeSelector } from "./store/extraSlice/selectors";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config/config";

import { LocaleLayoutWrapper } from "./LocaleLayoutWrapper";
import { ClientThemeProvider } from "./components/bits/MUI/ClientThemeProvider";

// Cache for loaded messages
const messageCache = {};

async function loadMessages(locale) {
    // Return cached messages if available
    if (messageCache[locale]) {
        return messageCache[locale];
    }

    try {
        let messages;
        switch (locale) {
            case SUPPORTED_LOCALES.ENGLISH:
                messages = (await import("./translations/en.json")).default;
                break;
            case SUPPORTED_LOCALES.JAPANESE:
                messages = (await import("./translations/jp.json")).default;
                break;
            default:
                messages = (
                    await import(`./translations/${DEFAULT_LOCALE}.json`)
                ).default;
        }

        // Cache the loaded messages
        messageCache[locale] = messages;
        return messages;
    } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        return (await import(`./translations/${DEFAULT_LOCALE}.json`)).default;
    }
}

function LocalizationWrapper({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState(null);

    const locale = useSelector(localeSelector);

    useEffect(() => {
        setLoading(true);
        setError(null);

        loadMessages(locale)
            .then((loadedMessages) => {
                setMessages(loadedMessages);
            })
            .catch((err) => {
                console.error("Localization loading error:", err);
                setError("Failed to load localization data");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [locale]);

    if (loading) {
        return <div>Loading translations...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!messages) {
        return <div>No translation messages available</div>;
    }

    return (
        <LocaleLayoutWrapper className="locale_layout_w">
            <IntlProvider
                locale={locale}
                messages={messages}
                onError={(err) => {
                    if (err.code !== "MISSING_TRANSLATION") {
                        console.error("IntlProvider error:", err);
                    }
                }}
            >
                <ClientThemeProvider
                    locale={locale}
                    className={"ClientThemeProvider"}
                >
                    {children}
                    <Toaster
                        closeButton
                        position="top-right"
                        toastOptions={{ className: "my-toast" }}
                    />
                </ClientThemeProvider>
            </IntlProvider>
        </LocaleLayoutWrapper>
    );
}

export default LocalizationWrapper;
