import { useIntl } from "react-intl";
import { IconButton, Tooltip, Typography } from "@mui/material";

import { ButtonComp } from "../Button";
import { VerticalTabsWrapper } from "./VerticalTabsWrapper";

export const VerticalTabs = ({
    tabList,
    onStepChange,
    filledFormSteps,
    showLabel = false,
}) => {
    const { formatMessage } = useIntl();

    const handleTabClick = (id) => onStepChange?.(id);

    const isTabActive = (id) => filledFormSteps?.includes(id);

    return (
        <VerticalTabsWrapper className="vertical-tw">
            {tabList.map((item) => {
                const isActive = isTabActive(item.id);
                const commonProps = {
                    disabled: !isActive,
                    onClick: () => handleTabClick(item.id),
                    className: `vertical-tw-${showLabel ? "button" : "icon"} ${
                        isActive ? "vertical-tw-active" : ""
                    }`,
                };

                if (!showLabel) {
                    return (
                        <Tooltip
                            arrow
                            title={t(item.label)}
                            placement="right"
                            key={item.id}
                        >
                            <span>
                                <IconButton {...commonProps}>
                                    {item.icon}
                                </IconButton>
                            </span>
                        </Tooltip>
                    );
                }

                return (
                    <ButtonComp
                        fullWidth
                        key={item.id}
                        disableElevation
                        startIcon={item.icon}
                        {...commonProps}
                    >
                        <Typography className="vertical-tw-button-label">
                            {formatMessage({ id: item.label })}
                        </Typography>
                    </ButtonComp>
                );
            })}
        </VerticalTabsWrapper>
    );
};
