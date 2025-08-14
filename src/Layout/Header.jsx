import {
    Box,
    Menu,
    Tooltip,
    MenuItem,
    TextField,
    IconButton,
    Typography,
    InputAdornment,
} from "@mui/material";
import {
    Chat,
    Person,
    Handshake,
    KeyboardArrowUp,
    Menu as MenuIcon,
    KeyboardArrowDown,
    Search as SearchIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLocaleValue } from "../store/extraSlice";
import { localeSelector } from "../store/extraSlice/selectors";
import { HeaderChat } from "../components/HeaderChat/HeaderChat";

export default function Header({ toggleSidebar }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    const language = useSelector(localeSelector);

    const handleLanguageChange = (lang) => {
        dispatch(setLocaleValue(lang));
        setLanguageAnchorEl(null);
    };

    const handleLanguageClick = (event) => {
        setLanguageAnchorEl(event.currentTarget);
    };

    const handleLanguageClose = () => {
        setLanguageAnchorEl(null);
    };

    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Check if language menu is open
    const isLanguageMenuOpen = Boolean(languageAnchorEl);

    return (
        <Box
            component="header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="white"
            paddingRight={3}
            padding={2}
            boxShadow={1}
        >
            {/* Sidebar Toggle */}
            <Box display="flex" alignItems="center">
                {toggleSidebar && (
                    <Tooltip title="Menu" arrow>
                        <IconButton
                            onClick={toggleSidebar}
                            sx={{ fontSize: 24 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {/* Header Action Buttons */}
            <Box display="flex" alignItems="center" gap={2}>
                {/* Search Field with Icon */}
                <TextField
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    sx={{
                        width: 200,
                        "& .MuiOutlinedInput-root": {
                            paddingRight: "24px",
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ fontSize: 20 }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <Tooltip title="Chat" arrow>
                    <HeaderChat />
                </Tooltip>

                {/* Language Dropdown */}
                <Box
                    onClick={handleLanguageClick}
                    sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        "&:hover": { backgroundColor: "#f1f1f1" },
                    }}
                >
                    <Typography sx={{ fontSize: 16, mr: 0.5 }}>
                        {language}
                    </Typography>
                    {isLanguageMenuOpen ? (
                        <KeyboardArrowUp fontSize="small" />
                    ) : (
                        <KeyboardArrowDown fontSize="small" />
                    )}
                </Box>
                <Menu
                    anchorEl={languageAnchorEl}
                    open={isLanguageMenuOpen}
                    onClose={handleLanguageClose}
                    sx={{ mt: 1 }}
                >
                    <MenuItem onClick={() => handleLanguageChange("en")}>
                        English
                    </MenuItem>
                    <MenuItem onClick={() => handleLanguageChange("ja")}>
                        Japanese
                    </MenuItem>
                </Menu>

                <Tooltip title="Invite" arrow>
                    <IconButton sx={{ fontSize: 24 }}>
                        <Handshake />
                    </IconButton>
                </Tooltip>

                {/* Profile Menu */}
                <IconButton sx={{ fontSize: 24 }} onClick={handleProfileClick}>
                    <Person />
                </IconButton>

                {/* Profile Dropdown Menu */}
                <Menu
                    anchorEl={profileAnchorEl}
                    open={Boolean(profileAnchorEl)}
                    onClose={handleProfileClose}
                    sx={{ mt: 1 }}
                >
                    <MenuItem onClick={handleProfileClose}>
                        Update Company Information
                    </MenuItem>
                    <MenuItem onClick={handleProfileClose}>
                        User Settings
                    </MenuItem>
                    <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
                </Menu>
            </Box>
        </Box>
    );
}
