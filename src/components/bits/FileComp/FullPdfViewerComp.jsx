import { Alert } from "@mui/material";
// import { isSafari } from "react-device-detect";

import { FullPdfViewerCompWrapper } from "./FullViewerCompWrapper";
import { useIntl } from "react-intl";

const docUrl = `http://docs.google.com/gview?embedded=true&url=`;

export const FullPdfViewerComp = (props) => {
    const { url } = props;
    const intl = useIntl();

    const link = `${docUrl}${url}`;

    const FallbackMessage = (
        <>
            {intl.formatMessage({ id: "pdf_browser_not_supported" })} &nbsp;
            <a target="_blank" rel="noopener noreferrer" href={url}>
                {intl.formatMessage({ id: "view_pdf" })}
            </a>
        </>
    );

    return (
        <FullPdfViewerCompWrapper className="pvw">
            <Alert severity="info" className="pvw-alert">
                {intl.formatMessage({ id: "pdf_load_error" })} &emsp;
                <b>
                    <u>
                        <a target="_blank" rel="noopener noreferrer" href={url}>
                            {intl.formatMessage({ id: "view_pdf" })}
                        </a>
                    </u>
                </b>
            </Alert>
            <br />
            <div className="pvw-pdf">
                <iframe src={link} width="100%" height="100%">
                    {FallbackMessage}
                </iframe>
                {/* {isSafari ? (
          <iframe src={url} width="100%" height="100%">
            {FallbackMessage}
          </iframe>
        ) : (
          <object data={url} width="100%" height="100%" type="application/pdf">
            <iframe src={url} width="100%" height="100%">
              {FallbackMessage}
            </iframe>
          </object>
        )} */}
            </div>
        </FullPdfViewerCompWrapper>
    );
};
