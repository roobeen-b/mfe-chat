import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { useTabQuery } from "@utils/index";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        marginTop: "1rem",
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function TabComp({ tabList }) {
    const { formatMessage } = useIntl();

    const { onTabChange, activeTabIndex } = useTabQuery({
        list: tabList?.length > 0 ? tabList.map((item) => item.alias) : [],
        val: tabList?.length > 0 ? tabList[0].alias : "",
    });

    const handleChange = (_event, newValue) => {
        onTabChange(tabList[newValue].alias);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "#ffffff",
                    border: "1px solid #95ddfa",
                }}
            >
                <Tabs
                    value={activeTabIndex || 0}
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleChange}
                    aria-label="scrollable auto tabs"
                >
                    {tabList &&
                        tabList.length > 0 &&
                        tabList.map((tabItem, index) => (
                            <Tab
                                key={tabItem.id}
                                label={formatMessage({ id: tabItem.label })}
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

            {tabList &&
                tabList.length > 0 &&
                tabList.map((tabItem, index) => (
                    <CustomTabPanel
                        key={tabItem.id}
                        value={activeTabIndex || 0}
                        index={index}
                    >
                        {tabItem.component}
                    </CustomTabPanel>
                ))}
        </Box>
    );
}
