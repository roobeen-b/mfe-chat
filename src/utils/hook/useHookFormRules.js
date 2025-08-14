import { useIntl } from "react-intl";
import {
    isUrlRegex,
    isEmailRegex,
    isPhoneRegex,
    isNumberRegex,
    isIntegerRegex,
    strongPasswordRegex,
    isPhoneWithCodeRegex,
} from "..";

export const useHookFormRules = () => {
    const { formatMessage } = useIntl();

    return {
        required: formatMessage({ id: "required" }),
        invalidMsg: formatMessage({ id: "invalid_value" }),
        confirmPwMsg: formatMessage({ id: "password_mismatch" }),
        passwordPattern: {
            value: strongPasswordRegex,
            message: formatMessage({ id: "weak_password" }),
        },
        isUrlPattern: {
            value: isUrlRegex,
            message: formatMessage({ id: "invalid_url" }),
        },
        emailPattern: {
            value: isEmailRegex,
            message: formatMessage({ id: "invalid_email" }),
        },
        isPhonePattern: {
            value: isPhoneRegex,
            message: formatMessage({ id: "invalid_phone" }),
        },
        isPhoneWithCodePattern: {
            value: isPhoneWithCodeRegex,
            message: formatMessage({ id: "invalid_phone" }),
        },
        isNumberPattern: {
            value: isNumberRegex,
            message: formatMessage({ id: "invalid_number" }),
        },
        isIntegerPattern: {
            value: isIntegerRegex,
            message: formatMessage({ id: "invalid_number" }),
        },
        validateEmail: (value) => {
            console.info({ isEmailValid: value });
            return (
                isEmailRegex.test(
                    typeof value === "string" ? value : value.label
                ) || formatMessage({ id: "invalid_email" })
            );
        },
    };
};
