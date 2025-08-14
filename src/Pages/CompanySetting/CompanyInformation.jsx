import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import CustomModal from "../../Components/CustomModal";
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
    OutlinedInput,
    InputAdornment,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

export default function DashboardPage() {
    const [fileNameStamp, setFileNameStamp] = useState("");
    const [fileNameLogo, setFileNameLogo] = useState("");
    const [imagePreviewStamp, setImagePreviewStamp] = useState(null);
    const [imagePreviewLogo, setImagePreviewLogo] = useState(null);
    const [selectedOptionStamp, setSelectedOptionStamp] = useState("yes");
    const [selectedOptionLogo, setSelectedOptionLogo] = useState("yes");
    const [openAddBranch, setOpenAddBranch] = useState(false);
    const [openViewBranch, setOpenViewBranch] = useState(false);
    const [openAddBank, setOpenAddBank] = useState(false);
    const breadcrumbs = [
        { label: "Company Setting", href: "/company-setting/information" },
        { label: "Information" },
    ];
    const [formData, setFormData] = useState({
        // Business Information
        departmentName: "",
        industryClassification: "",
        businessName: "",
        emailAddress: "",
        faxNumber: "",
        employeesNumber: "",
        telephoneNumber: "",
        tcountryCode: "+81",
        phoneNumber: "",
        countryCode: "+81",
        taxLiability: "0", // 0 for Tax-Exempt, 1 for Not Taxable
        // Address Information
        postalCode: "",
        prefectures: "",
        municipality: "",
        streetAddress: "",
        buildingName: "",
        // Invoice Condition Input
        taxConsumption: "",
        taxRate: "",
        rounding: "",
        invoicePattern: "",
        // Additional Options
        closingDate: "",
        openingDate: "",
        paymentMonth: "NextMonth",
        paymentDate: "",
        // Document Branding
        invoiceStamp: null,
        companyLogo: null,
        useStamp: "yes",
        useLogo: "yes",
    });

    const [branchData, setBrachData] = useState({
        branchName: "",
        emailAddress: "",
        countryCode: "+81",
        mobileNumber: "",
        faxNumber: "",
        addressLine1: "",
        addressLine2: "",
        postalCode: "",
        prefectures: "",
        municipality: "",
        streetAddress: "",
        buildingName: "",
    });

    const [formBankData, setFormBankData] = useState({
        bankName: "",
        branchName: "",
        accountType: "0",
        accountNumber: "",
        accountHolderName: "",
        invoiceDisplay: "0",
        defaultAccount: false,
    });

    const handleBankInputChange = (field, value) => {
        setFormBankData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleBankSubmit = () => {
        console.log("Submitting Bank Detail:", formBankData);
        setOpenAddBank(false);
    };

    // for adding branch office
    const handleBranchInputChange = (field, value) => {
        setBrachData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleBranchSubmit = () => {
        console.log("Form submitted:", branchData);
        setOpenAddBranch(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFileChangeStamp = (e) => {
        const file = e.target.files[0];
        setFileNameStamp(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewStamp(reader.result); // Store the image preview URL
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleFileChangeLogo = (e) => {
        const file = e.target.files[0];
        setFileNameLogo(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviewLogo(reader.result); // Store the image preview URL
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleClearStamp = () => {
        setImagePreviewStamp(null);
        setFileNameStamp("");
    };

    const handleClearLogo = () => {
        setImagePreviewLogo(null);
        setFileNameLogo("");
    };

    // for adding company information
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
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
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4" component="h1" color="primary">
                        Registration
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        {/* Add Branch Office Button and Modal */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenAddBranch(true)}
                        >
                            Add Branch Office
                        </Button>
                        <CustomModal
                            open={openAddBranch}
                            onClose={() => setOpenAddBranch(false)}
                            title="Add Branch Office"
                            maxWidth="md"
                            dividers={true}
                            titleStyles={{
                                color: "#2196f3",
                                fontWeight: "bold",
                            }}
                            actions={
                                <>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setOpenAddBranch(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBranchSubmit}
                                    >
                                        Register
                                    </Button>
                                </>
                            }
                        >
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Branch Name *
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="branchName"
                                        type="text"
                                        value={branchData.branchName}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "branchName",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Email Address
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="emailAddress"
                                        type="text"
                                        value={branchData.emailAddress}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "emailAddress",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Mobile Number
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <OutlinedInput
                                            type="number"
                                            value={branchData.mobileNumber}
                                            onChange={(e) =>
                                                handleBranchInputChange(
                                                    "mobileNumber",
                                                    e.target.value
                                                )
                                            }
                                            startAdornment={
                                                <InputAdornment
                                                    position="start"
                                                    sx={{
                                                        paddingRight: 1,
                                                    }}
                                                >
                                                    <Select
                                                        value={
                                                            branchData.countryCode
                                                        }
                                                        onChange={(e) =>
                                                            handleBranchInputChange(
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
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>Fax</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="faxNumber"
                                        type="text"
                                        value={branchData.faxNumber}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "faxNumber",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Address Line 1{" "}
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="addressLine1"
                                        type="text"
                                        value={branchData.addressLine1}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "addressLine1",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Address Line 2
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="addressLine2"
                                        type="text"
                                        value={branchData.addressLine2}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "addressLine2",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Postal Code
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="postalCode"
                                        type="number"
                                        value={branchData.postalCode}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "postalCode",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Prefectures
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="prefectures"
                                        type="text"
                                        value={branchData.prefectures}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "prefectures",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Municipality
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="municipality"
                                        type="text"
                                        value={branchData.municipality}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "municipality",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Street Address
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="streetAddress"
                                        type="text"
                                        value={branchData.streetAddress}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "streetAddress",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Building name, room number etc.
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        name="buildingName"
                                        type="text"
                                        value={branchData.buildingName}
                                        onChange={(e) =>
                                            handleBranchInputChange(
                                                "buildingName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </CustomModal>

                        {/* View Branch Office Button and Modal */}
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setOpenViewBranch(true)}
                        >
                            View Branch Office
                        </Button>
                        <CustomModal
                            open={openViewBranch}
                            onClose={() => setOpenViewBranch(false)}
                            title="Branch Offices List"
                            maxWidth="lg"
                            dividers={true}
                            titleStyles={{
                                color: "#2196f3",
                                fontWeight: "bold",
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    aria-label="branch offices table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Branch Name
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Email Address
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Mobile Number
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Fax Number
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Postal Code
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Sample data - replace with your actual data */}
                                        <TableRow>
                                            <TableCell>Tokyo Central</TableCell>
                                            <TableCell>
                                                tokyo@example.com
                                            </TableCell>
                                            <TableCell>
                                                +81 9012345678
                                            </TableCell>
                                            <TableCell>+81 312345678</TableCell>
                                            <TableCell>100-0001</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Osaka Branch</TableCell>
                                            <TableCell>
                                                osaka@example.com
                                            </TableCell>
                                            <TableCell>
                                                +81 9012345679
                                            </TableCell>
                                            <TableCell>+81 612345678</TableCell>
                                            <TableCell>530-0001</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Kyoto Office</TableCell>
                                            <TableCell>
                                                kyoto@example.com
                                            </TableCell>
                                            <TableCell>
                                                +81 9012345680
                                            </TableCell>
                                            <TableCell>+81 752345678</TableCell>
                                            <TableCell>600-0001</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CustomModal>
                    </Box>
                </Box>
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
                                Business Information
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
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Business Name{" "}
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
                                        name="businessName"
                                        placeholder="Enter business name"
                                        value={formData.businessName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "businessName",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Industry Classification{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            name="industryClassification"
                                            displayEmpty
                                            value={
                                                formData.industryClassification
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "industryClassification",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem
                                                value=""
                                                disabled
                                                selected
                                            >
                                                -- Select Industry Type --
                                            </MenuItem>
                                            <MenuItem value="IT">IT</MenuItem>
                                            <MenuItem value="Finance">
                                                Finance
                                            </MenuItem>
                                            <MenuItem value="Retail">
                                                Retail
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 2, sm: 2 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        No. of Emp{" "}
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
                                        name="employeesNumber"
                                        placeholder="10"
                                        type="number"
                                        value={formData.employeesNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "employeesNumber",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 4, sm: 4 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        FAX{" "}
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
                                        name="faxNumber"
                                        placeholder="Enter fax number"
                                        type="text"
                                        value={formData.faxNumber}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "faxNumber",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 6, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Representative Telephone Number{" "}
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
                                            value={formData.telephoneNumber}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "telephoneNumber",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter telephone number"
                                            startAdornment={
                                                <InputAdornment
                                                    position="start"
                                                    sx={{
                                                        paddingRight: 1,
                                                    }}
                                                >
                                                    <Select
                                                        value={
                                                            formData.tcountryCode
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                "tcountryCode",
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
                            </Grid>

                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Representative Phone Number{" "}
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
                                            placeholder="Enter phone number"
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
                                        name="emailAddress"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={formData.emailAddress}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "emailAddress",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Tax Liability{" "}
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
                                            name="taxLiability"
                                            value={formData.taxLiability}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "taxLiability",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="0"
                                                control={<Radio />}
                                                label="Tax-Exempt Business"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio />}
                                                label="Not Taxable Business"
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
                                Address Information
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
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Postal Code{" "}
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
                                        name="postalCode"
                                        type="number"
                                        placeholder="Enter postal code"
                                        value={formData.postalCode}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "postalCode",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Prefectures{" "}
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
                                        name="prefectures"
                                        placeholder="Enter your prefectures"
                                        value={formData.prefectures}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "prefectures",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Municipality{" "}
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
                                        name="municipality"
                                        placeholder="Enter your municipality"
                                        value={formData.municipality}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "municipality",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Street Address{" "}
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
                                        name="streetAddress"
                                        placeholder="Enter your street address"
                                        value={formData.streetAddress}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "streetAddress",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Building name, room number etc.{" "}
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
                                        name="buildingName"
                                        value={formData.buildingName}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "buildingName",
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

                    {/* Invoice Condition Input Section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Invoice Condition Input
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
                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Display of Consumption Tax{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "error.main",
                                                }}
                                            >
                                                *
                                            </Box>
                                        </Typography>
                                        <FormControl
                                            component="fieldset"
                                            fullWidth
                                        >
                                            <RadioGroup
                                                row
                                                name="taxConsumption"
                                                value={formData.taxConsumption}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "taxConsumption",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ gap: 5 }}
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Tax Exclusive Pricing"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="Tax Inclusive Pricing"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Tax Rate{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "error.main",
                                                }}
                                            >
                                                *
                                            </Box>
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                name="taxRate"
                                                value={formData.taxRate}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "taxRate",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ gap: 5 }}
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="8%"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="10%"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Rounding{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "error.main",
                                                }}
                                            >
                                                *
                                            </Box>
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                name="rounding"
                                                value={formData.rounding}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "rounding",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ gap: 5 }}
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Rounding Down"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="Rounding Up"
                                                />
                                                <FormControlLabel
                                                    value="2"
                                                    control={<Radio />}
                                                    label="Rounding to nearest whole number"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Invoice Pattern{" "}
                                            <Box
                                                component="span"
                                                sx={{
                                                    color: "error.main",
                                                }}
                                            >
                                                *
                                            </Box>
                                        </Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                name="invoicePattern"
                                                value={formData.invoicePattern}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "invoicePattern",
                                                        e.target.value
                                                    )
                                                }
                                                sx={{ gap: 5 }}
                                            >
                                                <FormControlLabel
                                                    value="0"
                                                    control={<Radio />}
                                                    label="Pattern 1"
                                                />
                                                <FormControlLabel
                                                    value="1"
                                                    control={<Radio />}
                                                    label="Pattern 2"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                    <Divider sx={{ mb: 4 }} />

                    {/* Additional Information */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Additional Options
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
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Closing Date{" "}
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
                                        name="closingDate"
                                        value={formData.closingDate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "closingDate",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Opening Date{" "}
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
                                        name="openingDate"
                                        value={formData.openingDate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "openingDate",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Payment Month{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl fullWidth size="small">
                                        <Select
                                            name="paymentMonth"
                                            value={formData.paymentMonth}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "paymentMonth",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem
                                                value="NextMonth"
                                                selected
                                            >
                                                Next Month
                                            </MenuItem>
                                            <MenuItem value="2Month">
                                                2 Month
                                            </MenuItem>
                                            <MenuItem value="3Month">
                                                3 Month
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Payment Date{" "}
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
                                        name="paymentDate"
                                        value={formData.paymentDate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "paymentDate",
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

                    {/* Company Logo and Stamp Upload section */}
                    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                        <Box sx={{ flex: "0 0 30%" }}>
                            <Typography
                                variant="h5"
                                component="h2"
                                sx={{ mb: 1 }}
                            >
                                Document Branding Configuration
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Upload your authorized invoice stamp and company
                                logo to customize your outgoing documents.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: "0 0 70%", pr: 4 }}>
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                {/* Invoice Stamp Upload */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Invoice Stamp
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <Box
                                        sx={{
                                            border: "1px dashed #ccc",
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: "center",
                                            backgroundColor: "#fafafa",
                                            minHeight: 250,
                                        }}
                                    >
                                        {imagePreviewStamp ? (
                                            // Show image preview, Clear and "Select Image" buttons
                                            <>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: 150,
                                                        background: `url(${imagePreviewStamp}) no-repeat center center`,
                                                        backgroundSize:
                                                            "contain",
                                                        marginBottom: 2,
                                                    }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{
                                                        bgcolor: "#0d99ff",
                                                        marginBottom: 1,
                                                    }}
                                                >
                                                    Select Image
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleFileChangeStamp
                                                        }
                                                        accept="image/*"
                                                    />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: "error.main",
                                                        borderColor:
                                                            "error.main",
                                                        marginBottom: 1,
                                                        marginLeft: 1,
                                                    }}
                                                    onClick={handleClearStamp}
                                                >
                                                    Clear
                                                </Button>
                                            </>
                                        ) : (
                                            // Show the upload prompt if no image is selected
                                            <>
                                                <CloudUpload
                                                    sx={{
                                                        fontSize: 40,
                                                        color: "text.secondary",
                                                        mb: 1,
                                                    }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{ mb: 2 }}
                                                >
                                                    Upload your Invoice Stamp
                                                    here
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{
                                                        bgcolor: "#0d99ff",
                                                    }}
                                                >
                                                    Select Files
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleFileChangeStamp
                                                        }
                                                        accept="image/*"
                                                    />
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 2, mb: 1 }}
                                    >
                                        Upload the stamp to be automatically
                                        applied to invoices.
                                    </Typography>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            value={selectedOptionStamp}
                                            onChange={(e) =>
                                                setSelectedOptionStamp(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {/* Company Logo Upload */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Company Logo
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <Box
                                        sx={{
                                            border: "1px dashed #ccc",
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: "center",
                                            backgroundColor: "#fafafa",
                                            minHeight: 250,
                                        }}
                                    >
                                        {imagePreviewLogo ? (
                                            // Show image preview, Clear and "Select Image" buttons
                                            <>
                                                <Box
                                                    sx={{
                                                        width: "100%",
                                                        height: 150,
                                                        background: `url(${imagePreviewLogo}) no-repeat center center`,
                                                        backgroundSize:
                                                            "contain",
                                                        marginBottom: 2,
                                                    }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{
                                                        bgcolor: "#0d99ff",
                                                        marginBottom: 1,
                                                    }}
                                                >
                                                    Select Image
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleFileChangeLogo
                                                        }
                                                        accept="image/*"
                                                    />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: "error.main",
                                                        borderColor:
                                                            "error.main",
                                                        marginBottom: 1,
                                                        marginLeft: 1,
                                                    }}
                                                    onClick={handleClearLogo}
                                                >
                                                    Clear
                                                </Button>
                                            </>
                                        ) : (
                                            // Show the upload prompt if no image is selected
                                            <>
                                                <CloudUpload
                                                    sx={{
                                                        fontSize: 40,
                                                        color: "text.secondary",
                                                        mb: 1,
                                                    }}
                                                />
                                                <Typography
                                                    variant="body1"
                                                    sx={{ mb: 2 }}
                                                >
                                                    Upload your Company Logo
                                                    here
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    sx={{
                                                        bgcolor: "#0d99ff",
                                                    }}
                                                >
                                                    Select Files
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleFileChangeLogo
                                                        }
                                                        accept="image/*"
                                                    />
                                                </Button>
                                            </>
                                        )}
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 2, mb: 1 }}
                                    >
                                        Upload your company’s logo to appear on
                                        official documents.
                                    </Typography>
                                    <FormControl>
                                        <RadioGroup
                                            row
                                            value={selectedOptionLogo}
                                            onChange={(e) =>
                                                setSelectedOptionLogo(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <FormControlLabel
                                                value="yes"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="Yes"
                                            />
                                            <FormControlLabel
                                                value="no"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="No"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            p: 2,
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                backgroundColor: "#1da1f2",
                                textTransform: "none",
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 2,
                            width: "100%",
                        }}
                    >
                        <Typography variant="body1">
                            Please register the bank account that will be
                            printed on the invoice. *
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                backgroundColor: "#1da1f2",
                                textTransform: "none",
                            }}
                            onClick={() => setOpenAddBank(true)}
                        >
                            New bank Account Registration
                        </Button>
                        <CustomModal
                            open={openAddBank}
                            onClose={() => setOpenAddBank(false)}
                            title="Add Bank Details"
                            maxWidth="sm"
                            dividers={true}
                            titleStyles={{
                                color: "#2196f3",
                                fontWeight: "bold",
                            }}
                            actions={
                                <>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setOpenAddBank(false)}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleBankSubmit}
                                    >
                                        Register
                                    </Button>
                                </>
                            }
                        >
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Bank Name *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="bankName"
                                    value={formBankData.bankName}
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "bankName",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Branch Name *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="branchName"
                                    value={formBankData.branchName}
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "branchName",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Account Type *
                                </Typography>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    name="accountType"
                                    value={formBankData.accountType || ""} // Fallback to empty string if undefined
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "accountType",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <MenuItem value="0" disabled>
                                        Select Account Type
                                    </MenuItem>
                                    <MenuItem value="1">Saving</MenuItem>
                                    <MenuItem value="2">Current</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Account Number *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="accountNumber"
                                    value={formBankData.accountNumber}
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "accountNumber",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Account Holder Name *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="accountHolderName"
                                    value={formBankData.accountHolderName}
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "accountHolderName",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </Grid>
                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <Typography sx={{ mb: 1 }}>
                                    Invoice Display
                                </Typography>
                                <Select
                                    fullWidth
                                    size="small"
                                    name="invoiceDisplay"
                                    value={formBankData.invoiceDisplay || "0"}
                                    onChange={(e) =>
                                        handleBankInputChange(
                                            "invoiceDisplay",
                                            e.target.value
                                        )
                                    }
                                >
                                    <MenuItem value="1">Yes 1</MenuItem>
                                    <MenuItem value="2">Yes 2</MenuItem>
                                    <MenuItem value="0">No</MenuItem>
                                </Select>
                            </Grid>

                            <Grid
                                container
                                size={{ xs: 12, md: 12 }}
                                sx={{ mb: 2 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                formBankData.defaultAccount
                                            }
                                            onChange={(e) =>
                                                handleBankInputChange(
                                                    "defaultAccount",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    }
                                    label="Default Account"
                                />
                            </Grid>
                        </CustomModal>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
