import { useRef } from "react";

import { getRandomString } from "../../../utils";

const ImagePlaceHolderLink = "/assets/images/placeholder-img.png";
const blurDataURL =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8ePtOAQAIBwL60MBUqgAAAABJRU5ErkJggg==";

const ImgComp = ({
    src,
    type,
    width,
    height,
    placeholder,
    fill = false,
    alt = "img" + getRandomString(5),
    ...rest
}) => {
    const ref = useRef(null);

    const onError = (_) => {
        if (ref?.current) {
            ref.current.src = ImagePlaceHolderLink;
            ref.current.srcset = ImagePlaceHolderLink;
        }
    };

    return (
        <img
            ref={ref}
            alt={alt}
            src={src}
            width={width}
            height={height}
            onError={onError}
            {...rest}
        />
    );
};

export { ImgComp, blurDataURL, ImagePlaceHolderLink };
