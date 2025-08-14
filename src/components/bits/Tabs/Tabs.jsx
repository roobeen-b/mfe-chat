import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Badge } from "@mui/material";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function OnlyTabComp({
    tabList,
    className,
    activeTabIndex,
    handleTabChange,
    hasBadge = false,
    noBorder = false,
    variant = "scrollable",
}) {
    const { formatMessage } = useIntl();

    const handleChange = (_event, newValue) => {
        handleTabChange(newValue);
    };

    return (
        <Box sx={{ width: "100%" }} className={"otc " + className}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "#ffffff",
                    border: noBorder ? "none" : "1px solid #95ddfa",
                }}
            >
                <Tabs
                    variant={variant}
                    scrollButtons="auto"
                    className={"otc-tabs"}
                    onChange={handleChange}
                    value={activeTabIndex || 0}
                    aria-label="scrollable auto tabs"
                    classes={{
                        root: "otc-tabs-root",
                        fixed: "otc-tabs-fixed",
                        centered: "otc-tabs-centered",
                        scroller: "otc-tabs-scroller",
                        indicator: "otc-tabs-indicator",
                        flexContainer: "otc-tabs-flexContainer",
                        scrollButtons: "otc-tabs-scrollButtons",
                    }}
                >
                    {tabList &&
                        tabList.length > 0 &&
                        tabList.map((tabItem, index) => (
                            <Tab
                                key={tabItem.alias}
                                label={
                                    hasBadge ? (
                                        <Badge
                                            badgeContent={tabItem?.count}
                                            color="primary"
                                        >
                                            {formatMessage({
                                                id: tabItem.label,
                                            })}
                                        </Badge>
                                    ) : (
                                        t(tabItem.label)
                                    )
                                }
                                className={"otc-tabs-single"}
                                {...a11yProps(index)}
                                sx={{
                                    fontWeight: 400,
                                    fontSize: "0.9rem",
                                    color: "#7f7f7f",
                                }}
                            />
                        ))}
                </Tabs>
            </Box>
        </Box>
    );
}
