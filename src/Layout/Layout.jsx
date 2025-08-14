import { useState } from "react";
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header";
import CustomBreadcrumbs from "../Components/Breadcrumbs";
import { Box } from "@mui/material";

const Layout = ({ children, breadcrumbs }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar isSidebarOpen={isSidebarOpen} />

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: "#FAF9F6",
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Sticky Header */}
                <Box
                    sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: (theme) => theme.zIndex.appBar,
                        backgroundColor: "inherit",
                    }}
                >
                    <Header toggleSidebar={toggleSidebar} />
                </Box>

                {/* Page content */}
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <CustomBreadcrumbs items={breadcrumbs} />
                    {/* Main content area */}
                    <Box sx={{ mt: 2 }}>{children}</Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
