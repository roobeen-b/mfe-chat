import { memo, useEffect } from "react";
import { ImgComp } from "../FileComp/ImgComp";
import { useGetDataFromLink } from "@utils/index";
import { InfoGeneratedFromLinkCardWrapper } from "./InfoGeneratedFromLinkCardWrapper";

const attachCn = (v, c) => `${v} ${v}-${c}`;

const InfoGeneratedFromLinkCard = ({ data, size, onDataLoaded }) => {
    const parsedData = useGetDataFromLink(data);

    useEffect(() => {
        if (parsedData?.title && onDataLoaded) {
            onDataLoaded();
            console.log("called onDataLoaded");
        }
    }, [parsedData]);

    if (!parsedData) return null;

    const redirectToSite = () => {
        window?.open?.(parsedData.url, "_blank");
    };
    return (
        <InfoGeneratedFromLinkCardWrapper
            className="igf-lcw"
            onClick={redirectToSite}
        >
            <div className={attachCn(`igf-lcw-img-container`, size)}>
                <ImgComp
                    src={parsedData.img}
                    alt={parsedData.title}
                    className={attachCn(`igf-lcw-img-container-img`, size)}
                />
            </div>
            <div className={attachCn(`igf-lcw-content`, size)}>
                {parsedData.site && (
                    <h3 className={attachCn(`igf-lcw-content-site`, size)}>
                        {parsedData.site}
                    </h3>
                )}
                {parsedData.title && (
                    <h2
                        title={parsedData.title}
                        className={attachCn(`igf-lcw-content-title`, size)}
                    >
                        {parsedData.title}
                    </h2>
                )}
                {parsedData.description && (
                    <p
                        title={parsedData.description}
                        className={attachCn(`igf-lcw-content-desc`, size)}
                    >
                        {parsedData.description}
                    </p>
                )}
            </div>
        </InfoGeneratedFromLinkCardWrapper>
    );
};

export default memo(InfoGeneratedFromLinkCard);
