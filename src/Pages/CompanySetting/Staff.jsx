import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import {
    Box,
    Typography,
    TextField,
    Divider,
    RadioGroup,
    Radio,
    FormControlLabel,
    FormControl,
    Select,
    MenuItem,
    Grid,
    Button,
    FormGroup,
    Checkbox,
    OutlinedInput,
    InputAdornment,
} from "@mui/material";

export default function Home() {
    const breadcrumbs = [
        { label: "Company Setting", href: "/company-setting/staff" },
        { label: "Staff" },
    ];

    // Form state
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        countryCode: "+81",
        phoneNumber: "",
        accountStatus: "inactive",

        // Company Information
        departmentName: "",
        branchOffice: "HeadOffice",
        position: "",

        // Permissions
        senderPermissions: {
            selectAll: false,
            list: false,
            create: false,
            edit: false,
            send: false,
            scheduleWithdraw: false,
            delete: false,
            approval: false,
        },
        receiverPermissions: {
            selectAll: false,
            sendBack: false,
            create: false,
            approval: false,
            scheduleWithdraw: false,
            delete: false,
        },
        downloadAvailability: "Not Allowed",

        businessPartnerPermissions: {
            selectAll: false,
            list: false,
            create: false,
            edit: false,
            delete: false,
        },
        productsPermissions: {
            selectAll: false,
            list: false,
            create: false,
            edit: false,
            delete: false,
        },
        bookKeeping: "Not Allowed",

        staffPermissions: {
            selectAll: false,
            list: false,
            create: false,
            edit: false,
            delete: false,
        },
        locationPermissions: {
            selectAll: false,
            list: false,
            create: false,
            edit: false,
        },
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePermissionChange = (category, permission, checked) => {
        setFormData((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [permission]: checked,
            },
        }));
    };

    const handleSelectAllChange = (category, checked) => {
        setFormData((prev) => {
            const updatedCategory = { ...prev[category] };
            Object.keys(updatedCategory).forEach((key) => {
                updatedCategory[key] = checked;
            });
            return {
                ...prev,
                [category]: updatedCategory,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        alert("Form submitted successfully! Check console for details.");
    };

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Box
                sx={{
                    mx: "auto",
                    p: 2,
                    bgcolor: "#fff",
                    borderRadius: 1,
                    boxShadow: 1,
                    mt: 2,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{ mb: 2 }}
                >
                    New Registration
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <form onSubmit={handleSubmit} action="#">
                    {/* Personal Information Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Personal Information
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Please provide your basic details to help us
                                personalize your experience.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        First Name{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "firstName",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Last Name{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "lastName",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Email Address{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="email"
                                        placeholder="Enter email address"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Password{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="password"
                                        placeholder="*************"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Mobile Number{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <OutlinedInput
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "phoneNumber",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter mobile number"
                                            startAdornment={
                                                <InputAdornment
                                                    position="start"
                                                    sx={{
                                                        paddingRight: 1,
                                                    }}
                                                >
                                                    <Select
                                                        value={
                                                            formData.countryCode
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "countryCode",
                                                                e.target.value
                                                            )
                                                        }
                                                        variant="standard"
                                                        disableUnderline
                                                        sx={{
                                                            fontSize: 14,
                                                            background:
                                                                "transparent",
                                                            border: "none",
                                                            "&:focus": {
                                                                background:
                                                                    "transparent",
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="+81">
                                                            +81
                                                        </MenuItem>
                                                        <MenuItem value="+977">
                                                            +977
                                                        </MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Account Activation/Deactivation{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            name="accountStatus"
                                            value={formData.accountStatus}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "accountStatus",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="active"
                                                control={<Radio />}
                                                label="Active"
                                            />
                                            <FormControlLabel
                                                value="inactive"
                                                control={<Radio />}
                                                label="Not Active"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    {/* Company Information Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Company Information
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Please provide your company details to help us
                                personalize your experience.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Department Name{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="departmentName"
                                        placeholder="Enter your department name"
                                        value={formData.departmentName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "departmentName",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Branch Office{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            name="branchOffice"
                                            value={formData.branchOffice}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "branchOffice",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="HeadOffice">
                                                Head Office
                                            </MenuItem>
                                            <MenuItem value="BranchOne">
                                                Branch One
                                            </MenuItem>
                                            <MenuItem value="BranchTwo">
                                                Branch Two
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Position{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="position"
                                        placeholder="Enter your position"
                                        value={formData.position}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "position",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    {/* Invoices Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Invoices
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                You have the authority to manage and oversee all
                                billing and payment records.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Sender
                                </Typography>
                                <FormGroup sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.senderPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`senderPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "senderPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "senderPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Receiver
                                </Typography>
                                <FormGroup sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.receiverPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`receiverPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "receiverPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "receiverPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>

                                <FormControl component="fieldset">
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mb: 1 }}
                                    >
                                        Download Availability *
                                    </Typography>
                                    <RadioGroup
                                        row
                                        name="downloadAvailability"
                                        value={formData.downloadAvailability}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "downloadAvailability",
                                                e.target.value
                                            )
                                        }
                                        sx={{ gap: 3 }}
                                    >
                                        <FormControlLabel
                                            value="Allowed"
                                            control={<Radio />}
                                            label="Allowed"
                                        />
                                        <FormControlLabel
                                            value="Not Allowed"
                                            control={<Radio />}
                                            label="Not Allowed"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    {/* Master Data Management Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Master Data Management
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Manage and maintain critical master data that
                                powers core operations.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Business Partner Permissions
                                </Typography>
                                <FormGroup sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.businessPartnerPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`businessPartnerPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "businessPartnerPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "businessPartnerPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Products Permissions
                                </Typography>
                                <FormGroup sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.productsPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`productsPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "productsPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "productsPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>

                                <FormControl component="fieldset">
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{ mb: 1 }}
                                    >
                                        Book Keeping *
                                    </Typography>
                                    <RadioGroup
                                        row
                                        name="bookKeeping"
                                        value={formData.bookKeeping}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "bookKeeping",
                                                e.target.value
                                            )
                                        }
                                        sx={{ gap: 3 }}
                                    >
                                        <FormControlLabel
                                            value="Allowed"
                                            control={<Radio />}
                                            label="Allowed"
                                        />
                                        <FormControlLabel
                                            value="Not Allowed"
                                            control={<Radio />}
                                            label="Not Allowed"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    {/* Company Settings Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Company Settings
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                You are authorized to configure company-wide
                                settings and operational preferences.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Box
                                sx={{
                                    border: "1px solid #e0e0e0",
                                    borderRadius: 1,
                                    p: 2,
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Staff Permissions
                                </Typography>
                                <FormGroup sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.staffPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`staffPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "staffPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "staffPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>

                                <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    sx={{ mb: 2 }}
                                >
                                    Access Authority for Business Location
                                    Information
                                </Typography>
                                <FormGroup>
                                    <Grid container spacing={2}>
                                        {Object.entries(
                                            formData.locationPermissions
                                        ).map(([key, value]) => (
                                            <Grid
                                                key={key}
                                                size={{
                                                    xs: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                            >
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            name={`locationPermissions.${key}`}
                                                            checked={value}
                                                            onChange={(e) => {
                                                                if (
                                                                    key ===
                                                                    "selectAll"
                                                                ) {
                                                                    handleSelectAllChange(
                                                                        "locationPermissions",
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                } else {
                                                                    handlePermissionChange(
                                                                        "locationPermissions",
                                                                        key,
                                                                        e.target
                                                                            .checked
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        key
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(
                                                                /([A-Z])/g,
                                                                " $1"
                                                            )
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </FormGroup>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Register
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
