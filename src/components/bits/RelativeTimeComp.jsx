import { useRelativeTime } from "@utils/index";

export const RelativeTimeComp = (props) => {
    const relativeTime = useRelativeTime(props?.timestamp, props.options);

    return <span>{relativeTime}</span>;
};
