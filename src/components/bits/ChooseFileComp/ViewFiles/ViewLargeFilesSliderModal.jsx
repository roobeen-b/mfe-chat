import { useIntl } from "react-intl";
import { Button, Typography } from "@mui/material";

import { CustomSwiper } from "@components/bits/Swiper/SwiperComp";
import { ViewLargeFilesSliderContentWrapper } from "./ViewLargeFilesSliderWrapper";
import { FullscreenDialog } from "@components/bits/Modal/FullscreenDialog/FullscreenDialog";

import { FileTypeIcons } from "./FileTypeIcons";
import { parseFileDetails } from "@utils/fileUtils";
import { FullPdfViewerComp } from "@components/bits/FileComp/FullPdfViewerComp";
import { FullDocViewerComp } from "@components/bits/FileComp/FullDocViewerComp";

export const ViewLargeFilesSliderDialog = (props) => {
    const { files, index, closeDialog } = props;

    return (
        <>
            <FullscreenDialog
                open={index !== null}
                enableBackdropClose={false}
                onDialogClose={closeDialog}
            >
                {index !== null && (
                    <ViewLargeFilesSliderContent
                        files={files}
                        initialSlide={index}
                    />
                )}
            </FullscreenDialog>
        </>
    );
};

const ViewLargeFilesSliderContent = (props) => {
    const { files, initialSlide = 0 } = props;

    return (
        <ViewLargeFilesSliderContentWrapper className="vlf-sw-modal-content">
            <CustomSwiper
                navigation
                scrollbar
                pagination
                slidesPerView={1}
                initialSlide={initialSlide}
                className="vlf-sw-modal-content-swiper"
                slides={files.map((file, j) => (
                    <div
                        key={`file-${j + 1}`}
                        className="vlf-sw-modal-content-swiper-item"
                    >
                        <RenderSlideContent file={file} />
                    </div>
                ))}
            />
        </ViewLargeFilesSliderContentWrapper>
    );
};

const RenderSlideContent = ({ file }) => {
    const { url, type, title, name } = parseFileDetails(file);

    const { formatMessage } = useIntl();

    if (type === "image") {
        return (
            <div
                title={name}
                className="vlf-sw-modal-content-swiper-item-image"
            >
                <img src={url} alt="Image" layout="fill" objectFit="contain" />
            </div>
        );
    } else if (type === "pdf") {
        return <FullPdfViewerComp url={url} />;
    } else if (type === "docx" || type === "pptx" || type === "xlsx") {
        return <FullDocViewerComp url={url} />;
    } else {
        const IconComponent = FileTypeIcons[type] || FileTypeIcons["other"];

        return (
            <div title={name} className="vlf-sw-modal-content-swiper-item-file">
                {title && (
                    <Typography variant="body2" align="center" color="white">
                        {title}
                    </Typography>
                )}
                <IconComponent color="primary" sx={{ fontSize: 100 }} />
                <Button
                    download
                    fullWidth
                    href={url}
                    component="a"
                    target="_blank"
                    disableElevation
                    variant="contained"
                    rel="noopener noreferrer"
                    className="vlf-sw-modal-content-swiper-item-file-button"
                >
                    {formatMessage({ id: "download_file" })}
                </Button>
            </div>
        );
    }
};
