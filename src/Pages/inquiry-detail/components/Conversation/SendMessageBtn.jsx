import { useIntl } from "react-intl";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";

import { isDev } from "@utils/myFunc";
import { parseObjToFormData, SnackBar, useHookFormRules } from "@utils/index";
import { useCallAddChatFiles } from "@api/helpers/inquire/conversation/useCallAddChatFiles";

import { SendSquare } from "@components/_icons";
import { Spinner } from "@components/bits/Spinner";
import { InputField } from "@components/bits/InputField";
import EmojiPickerComp from "@components/bits/EmojiPicker";
import { useConversationSocket } from "./context/ConversationProvider";
import { ChooseFileComp } from "@components/bits/ChooseFileComp/ChooseFileComp";
import { ViewFilesIconText } from "@components/bits/ChooseFileComp/ViewFiles/ViewFilesIconText";

const defInit = {
    subject: "",
    message: "",
    urls: [],
    images: [],
};

export const SendMessageBtn = (props) => {
    const { init = defInit, isDisabled } = props;
    const { reply, sendMessage, sendStatus, setSendStatus, setReply } =
        useConversationSocket();

    const r = useHookFormRules();
    const { formatMessage } = useIntl();
    const submitButtonRef = useRef(null);
    const inputRef = useRef(null);

    const [msgData, setMsgData] = useState(init);
    const [openEmoPicker, setOpenEmoPicker] = useState(false);

    const {
        watch,
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: init,
    });

    const watchUrl = watch("urls");
    const watchImage = watch("images");
    const watchMessage = watch("message");
    const hasUrl = (watchUrl || [])?.length > 0;
    const hasImage = (watchImage || [])?.length > 0;

    const onAddFileSuccess = (data) => {
        sendMessage({ ...msgData, files: data?.data });
    };
    const onAddFileError = () => {};
    const { loading, callAddChatFiles } = useCallAddChatFiles({
        onSuccess: onAddFileSuccess,
        onError: onAddFileError,
    });

    useEffect(() => {
        if (reply?.message_id) {
            inputRef.current?.focus();
            if (reply?.type === "edit") setValue("message", reply?.message);
        }
    }, [reply?.message_id]);

    useEffect(() => {
        if (!sendStatus.loading && sendStatus.status === "success") {
            reset();
            setReply(null);
        }
        return () => {};
    }, [sendStatus.loading]);

    useEffect(() => {
        if (sendStatus.loading)
            setSendStatus({
                loading: false,
                status: null,
                error: null,
                scroll: true,
            });
    }, [watchMessage]);

    const onSubmit = async (data) => {
        if (reply?.type === "edit" && data.message === reply?.message) {
            SnackBar(
                {
                    message: formatMessage({ id: "message_not_edited" }),
                    doNotTranslate: true,
                },
                "warning"
            );
            return;
        }
        if (data?.images && data?.images?.length > 0) {
            const { images, ...rest } = data;
            setMsgData(rest);
            const formData = await parseObjToFormData({ files: images });
            callAddChatFiles({ formData, endpoint: "chat" });
            return;
        }
        delete data.images;
        sendMessage(data);
    };

    const onError = (data) => {
        if (isDev) console.error({ onError: data });
        SnackBar(
            {
                message: formatMessage({
                    id: "please_enter_message_or_attach_files",
                }),
                doNotTranslate: true,
            },
            "error"
        );
    };

    const handleKeyDown = (event) => {
        if (event.key !== "Enter") return;
        if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
            return;
        if (submitButtonRef.current) submitButtonRef.current.click();
        event.preventDefault();
    };

    const toggleEmojiBox = () => {
        setOpenEmoPicker((o) => !o);
    };

    const handleEmojiClick = (v) => {
        console.log({ v });
        setValue("message", `${watchMessage}${v}`);
    };
    return (
        <>
            <EmojiPickerComp
                skinTonesDisabled
                className="csw-epc"
                openEmojiBox={openEmoPicker}
                closeEmojiBox={toggleEmojiBox}
                handleOnEmojiClick={handleEmojiClick}
            />
            <form
                autoFocus
                className="csw-smb"
                onKeyDown={handleKeyDown}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Controller
                    name="message"
                    control={control}
                    rules={{
                        required: hasImage || hasUrl ? false : r.required,
                    }}
                    render={({ field }) => (
                        <div className="csw-smb-field-wrapper">
                            <InputField
                                fullWidth
                                autoFocus
                                maxRows={3}
                                id="message"
                                multiline={true}
                                inputRef={inputRef}
                                disabled={isDisabled}
                                className="csw-smb-field"
                                placeholder={formatMessage({
                                    id: "type_a_message",
                                })}
                                InputProps={{
                                    className: `csw-smb-field-InputProps ${
                                        hasImage || hasUrl
                                            ? "csw-smb-field-InputProps-hasFiles"
                                            : ""
                                    }`,
                                }}
                                startAdornment={
                                    <ChooseFileComp
                                        storage={watchUrl}
                                        device={watchImage}
                                        showStorage={!false}
                                        disabled={isDisabled}
                                        dropZoneProps={{
                                            maxFile: 3,
                                            multiple: true,
                                            disabled: isDisabled,
                                        }}
                                        handleFilesOnDevice={(v) => {
                                            setValue("images", [
                                                ...(watchImage || []),
                                                ...v,
                                            ]);
                                        }}
                                        handleFilesOnStorage={(v) => {
                                            setValue("urls", v);
                                        }}
                                    >
                                        <IconButton
                                            size="small"
                                            type="button"
                                            color="primary"
                                            disabled={isDisabled}
                                        >
                                            <AddBoxIcon fontSize="large" />
                                        </IconButton>
                                    </ChooseFileComp>
                                }
                                endAdornment={
                                    <>
                                        <IconButton
                                            size="small"
                                            type="button"
                                            color="primary"
                                            disabled={
                                                isDisabled ||
                                                loading ||
                                                sendStatus.loading ||
                                                Object.keys(errors).length > 0
                                            }
                                            onClick={toggleEmojiBox}
                                        >
                                            <SentimentSatisfiedAltIcon />
                                        </IconButton>
                                        <IconButton
                                            type="submit"
                                            size="small"
                                            color="primary"
                                            ref={submitButtonRef}
                                            disabled={
                                                isDisabled ||
                                                loading ||
                                                sendStatus.loading ||
                                                Object.keys(errors).length > 0
                                            }
                                        >
                                            <SendSquare fontSize="large" />
                                            {(loading ||
                                                sendStatus.loading) && (
                                                <Spinner
                                                    size={20}
                                                    absolute={!false}
                                                    color="primary"
                                                />
                                            )}
                                        </IconButton>
                                    </>
                                }
                                // helperText={errors?.message?.message}
                                error={Boolean(errors?.message?.message)}
                                {...field}
                            />
                            {(hasImage || hasUrl) && (
                                <ViewFilesIconText
                                    insideInput
                                    urls={watchUrl}
                                    files={watchImage}
                                    className="csw-smb-field-files"
                                    onChangeUrls={(urls) =>
                                        setValue("urls", urls)
                                    }
                                    onChangeFiles={(files) =>
                                        setValue("images", files)
                                    }
                                />
                            )}
                        </div>
                    )}
                />
            </form>
        </>
    );
};
