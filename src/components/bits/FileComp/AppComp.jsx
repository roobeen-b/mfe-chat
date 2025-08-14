import { getStringFromUri } from "../../../utils";
import { AvatarComp } from "./Avatar";

const AppComp = ({ src = "", alt, ...rest }) => {
    const title = alt || getStringFromUri(src);
    // const isPdf = isPdfUrl(src);

    return (
        <div className="w-full text-center" {...rest}>
            {/* {isPdf ? (
        <PdfComp pdfUrl={src} title={title} />
      ) : (
        )} */}
            <AvatarComp src={src} alt={alt} title={title} className="mx-auto" />
        </div>
    );
};

export { AppComp };
