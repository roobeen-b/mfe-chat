import { formatRelativeDate } from "@utils/parseDate";

export const RelativeDateComp = (props) => {
    const { timestamp, options } = props;

    return <span>{formatRelativeDate(timestamp, options)}</span>;
};
