import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";

import { ButtonComp } from "@components/bits/Button";
import { InputField } from "@components/bits/InputField";

import { isDev, useHookFormRules } from "@utils/index";
import { convoRelatedModalSelector } from "@store/extraSlice/selectors";
import { useConversationSocket } from "../context/ConversationProvider";

export const EditConvoNameModal = (props) => {
    const { closeModal } = props;
    const r = useHookFormRules();
    const { formatMessage } = useIntl();
    const { convoUpdate, callUpdateConvoEvent } = useConversationSocket();

    const inputRef = useRef(null);
    const convoModal = useSelector(convoRelatedModalSelector);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { name: convoModal?.convoName || "" },
    });

    const onSubmit = async (data) => {
        callUpdateConvoEvent({
            new_group_name: data.name,
            update_type: "GROUP_NAME_CHANGED",
        });
    };

    const onError = (data) => {
        if (isDev) console.error({ onError: data });
    };

    return (
        <form className="cmw-plm" onSubmit={handleSubmit(onSubmit, onError)}>
            <Typography variant="caption" color="textSecondary">
                {formatMessage({ id: "change_chat_name_description" })}
            </Typography>
            <Controller
                name="name"
                control={control}
                rules={{ required: r.required }}
                render={({ field }) => (
                    <InputField
                        fullWidth
                        id="name"
                        inputRef={inputRef}
                        label={formatMessage({ id: "chat_name" })}
                        className="ifw-form-field"
                        placeholder={formatMessage({ id: "enter_a_name" })}
                        helperText={errors?.name?.message}
                        error={Boolean(errors?.name?.message)}
                        {...field}
                    />
                )}
            />
            <div className="cmw-plm-btn">
                <ButtonComp
                    fullWidth
                    size="large"
                    type="button"
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={() => closeModal?.()}
                    isLoading={convoUpdate.loading}
                >
                    {formatMessage({ id: "cancel" })}
                </ButtonComp>
                <ButtonComp
                    fullWidth
                    size="large"
                    type="submit"
                    color="primary"
                    disableElevation
                    variant="contained"
                    isLoading={convoUpdate.loading}
                >
                    {formatMessage({ id: "change_chat_name" })}
                </ButtonComp>
            </div>
        </form>
    );
};
