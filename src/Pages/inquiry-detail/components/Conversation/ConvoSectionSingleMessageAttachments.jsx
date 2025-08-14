import { ConvoSectionSingleMessageReactions } from "./ConvoSectionSingleMessageReactions";
import { ViewLargeFilesSlider } from "@components/bits/ChooseFileComp/ViewFiles/ViewLargeFilesSlider";
import { ViewSquareFilesIconText } from "@components/bits/ChooseFileComp/ViewFiles/ViewSquareFilesIconText";

export const ConvoSectionSingleMessageAttachments = (props) => {
    const { attachments, className, reactions } = props;
    return (
        <div className={className}>
            <ViewLargeFilesSlider
                files={attachments}
                className="csw-cs-sm-attachments-list-wrapper"
            >
                <ViewSquareFilesIconText
                    //   disabled={true}
                    attachments={[...attachments]}
                    className="csw-cs-sm-attachments-list"
                />
            </ViewLargeFilesSlider>
            {reactions?.length > 0 && (
                <ConvoSectionSingleMessageReactions
                    reactions={reactions}
                    className={`csw-cs-sm-attachments-reactions`}
                />
            )}
        </div>
    );
};
