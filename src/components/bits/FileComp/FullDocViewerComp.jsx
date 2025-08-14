import { useIntl } from "react-intl";
import { Alert } from "@mui/material";
import { FulDocViewerCompWrapper } from "./FullViewerCompWrapper";

const docUrl = `https://view.officeapps.live.com/op/embed.aspx?src=`;

export const FullDocViewerComp = (props) => {
    const { url } = props;
    const intl = useIntl();

    const link = `${docUrl}${url}`;
    const FallbackMessage = (
        <>
            {intl.formatMessage({ id: "doc_browser_not_supported" })} &nbsp;
            <a target="_blank" rel="noopener noreferrer" href={url}>
                {intl.formatMessage({ id: "view_document" })}
            </a>
        </>
    );

    return (
        <FulDocViewerCompWrapper className="dvw">
            <Alert severity="info" className="dvw-alert">
                {intl.formatMessage({ id: `doc_load_error` })} &emsp;
                <b>
                    <u>
                        <a target="_blank" rel="noopener noreferrer" href={url}>
                            {intl.formatMessage({ id: "view_document" })}
                        </a>
                    </u>
                </b>
            </Alert>
            <br />
            <div className="dvw-doc">
                <iframe src={link} width="100%" height="100%">
                    {FallbackMessage}
                </iframe>
            </div>
        </FulDocViewerCompWrapper>
    );
};
