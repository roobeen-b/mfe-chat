import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { EmojiStyle } from "emoji-picker-react";

export default function EmojiPickerComp({
    width = 300,
    height = 350,
    openEmojiBox,
    closeEmojiBox,
    className = "",
    handleOnEmojiClick,
    lazyLoadEmojis = true,
    reactionsDefaultOpen = false,
    emojiStyle = EmojiStyle.NATIVE,
    previewConfig = { showPreview: false },
    ...rest
}) {
    const [Picker, setPicker] = useState(null);

    useEffect(() => {
        // Dynamically import the emoji picker on client side only
        import("emoji-picker-react").then((module) => {
            setPicker(() => module.default);
        });
    }, []);

    const emojiPickerFunction = (emojiObject) => {
        const emoji = emojiObject.emoji;
        handleOnEmojiClick(emoji);
    };

    return (
        <>
            <Box className={className} sx={{ zIndex: 3 }}>
                {openEmojiBox && Picker && (
                    <Picker
                        className={`picker ${className}-picker`}
                        width={width}
                        height={height}
                        emojiStyle={emojiStyle}
                        previewConfig={previewConfig}
                        lazyLoadEmojis={lazyLoadEmojis}
                        onEmojiClick={emojiPickerFunction}
                        reactionsDefaultOpen={reactionsDefaultOpen}
                        {...rest}
                    />
                )}
            </Box>
            {openEmojiBox && (
                <Box
                    onClick={closeEmojiBox}
                    sx={{
                        inset: 0,
                        zIndex: 2,
                        position: "fixed",
                    }}
                />
            )}
        </>
    );
}
