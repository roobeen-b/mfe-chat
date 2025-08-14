import clsx from "clsx";
import s from "./DangerouslySetInnerHTML.module.css";

// Function to create HTML markup
const createMarkup = (description) => {
    return { __html: description };
};

export const DangerouslySetInnerHTML = ({ description, className }) => {
    return (
        <div
            className={clsx(className, s.desc)}
            dangerouslySetInnerHTML={createMarkup(description || "")}
        />
    );
};
