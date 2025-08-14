import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Layout from "../../../Layout/Layout";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    IconButton,
    Autocomplete,
    styled,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const PdfContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDragging" && prop !== "hasPdf",
})(({ theme, isDragging, hasPdf }) => ({
    border: `2px dashed ${
        isDragging ? theme.palette.primary.main : theme.palette.divider
    }`,
    borderRadius: theme.shape.borderRadius,
    padding: 0, // Removed padding
    textAlign: "center",
    cursor: "pointer",
    position: "relative",
    height: "975px", // Increased height
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: hasPdf ? "flex-start" : "center",
    backgroundColor: isDragging
        ? theme.palette.action.hover
        : theme.palette.background.paper,
    transition: theme.transitions.create(["background-color", "border-color"], {
        duration: theme.transitions.duration.short,
    }),
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    overflow: "hidden",
}));

const PdfViewer = styled("iframe")({
    width: "100%",
    height: "100%",
    border: "none",
    flexGrow: 1,
});

const HiddenInput = styled("input")({
    display: "none",
});

const PdfPreviewContainer = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
});

export default function CreateInvoiceImport() {
    const breadcrumbs = [
        { label: "Management" },
        { label: "Invoice", href: "/management/invoice" },
        { label: "Import", href: "/management/invoice/import" },
    ];

    const [clientData, setClientData] = useState([]);
    const [isClientFetched, setIsClientFetched] = useState(false);
    const [staffData, setStaffData] = useState([]);
    const [isClientSelected, setIsClientSelected] = useState(false);

    const fetchClients = () => {
        if (isClientFetched) return;

        const formData = new FormData();
        formData.append("typeFilter", "regular");
        formData.append("ClientId", "1");

        axios
            .post("http://localhost:8000/billing/company/search", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setClientData(response.data);
                setIsClientFetched(true);
            })
            .catch((error) => {
                console.error("Client fetch error:", error);
            });
    };

    const [formData, setFormData] = useState({
        client: "",
        persons: [
            {
                personInCharge: "",
                emailAddress: "",
            },
        ],
        billingDate: "",
        closingDate: "",
        collectionDate: "",
        taxConsumption: "0", // 0 for exclusive, 1 for inclusive
        taxRate: "1", // 0 for 8%, 1 for 10%
        amount: "",
        taxAmount: "",
        subtotal: "",
        totalAmount: "",
    });

    const parseNumber = (value) => {
        if (!value) return 0;
        return parseFloat(value.replace(/,/g, "")) || 0;
    };

    // Format number with commas
    const formatNumberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Calculate amounts whenever relevant fields change
    useEffect(() => {
        const calculateAmounts = () => {
            const amount = parseNumber(formData.amount);
            const taxAmount = parseNumber(formData.taxAmount);
            const taxType = formData.taxConsumption;

            let subtotal = 0;
            let total = 0;

            if (taxType === "0") {
                // Tax-exclusive
                subtotal = Math.round(amount);
                total = Math.round(subtotal + taxAmount);
            } else {
                // Tax-inclusive
                total = Math.round(amount);
                subtotal = Math.round(total - taxAmount);
            }

            setFormData((prev) => ({
                ...prev,
                subtotal: formatNumberWithCommas(subtotal),
                totalAmount: formatNumberWithCommas(total),
            }));
        };

        calculateAmounts();
    }, [formData.amount, formData.taxAmount, formData.taxConsumption]);

    const [errors, setErrors] = useState({
        client: false,
        persons: [{ personInCharge: false, emailAddress: false }],
        quotationDate: false,
        expiryDate: false,
        subject: false,
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            client: !formData.client,
            persons: formData.persons.map((person) => ({
                personInCharge: !person.personInCharge,
                emailAddress:
                    !person.emailAddress ||
                    !/^\S+@\S+\.\S+$/.test(person.emailAddress),
            })),
            quotationDate: !formData.quotationDate,
            expiryDate: !formData.expiryDate,
            subject: !formData.subject,
        };

        setErrors(newErrors);

        // Check if any error exists
        if (
            newErrors.client ||
            newErrors.quotationDate ||
            newErrors.expiryDate ||
            newErrors.subject
        ) {
            valid = false;
        }

        for (const personError of newErrors.persons) {
            if (personError.personInCharge || personError.emailAddress) {
                valid = false;
                break;
            }
        }

        return valid;
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when field is filled
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: false,
            }));
        }
    };

    const handlePersonChange = (index, field, value) => {
        const updatedPersons = [...formData.persons];
        updatedPersons[index][field] = value;
        setFormData((prev) => ({
            ...prev,
            persons: updatedPersons,
        }));

        // Clear error when field is filled
        if (errors.persons[index][field]) {
            const updatedErrors = { ...errors };
            updatedErrors.persons[index][field] = false;
            setErrors(updatedErrors);
        }
    };

    const addPerson = () => {
        setFormData((prev) => ({
            ...prev,
            persons: [
                ...prev.persons,
                {
                    personInCharge: "",
                    emailAddress: "",
                },
            ],
        }));

        // Add corresponding error object for new person
        setErrors((prev) => ({
            ...prev,
            persons: [
                ...prev.persons,
                {
                    personInCharge: false,
                    emailAddress: false,
                },
            ],
        }));
    };

    const removePerson = (index) => {
        const updatedPersons = formData.persons.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            persons: updatedPersons,
        }));

        // Remove corresponding error object
        const updatedErrors = { ...errors };
        updatedErrors.persons = updatedErrors.persons.filter(
            (_, i) => i !== index
        );
        setErrors(updatedErrors);
    };

    const handleClientSelect = (event, selectedClient) => {
        const selectedClientId = selectedClient?.id || null;
        handleInputChange("client", selectedClientId);
        setIsClientSelected(!!selectedClientId);

        setFormData((prev) => ({
            ...prev,
            client: selectedClientId,
            persons: [
                {
                    personInCharge: "",
                    emailAddress: "",
                },
            ],
        }));

        setErrors((prev) => ({
            ...prev,
            client: false,
            persons: [
                {
                    personInCharge: false,
                    emailAddress: false,
                },
            ],
        }));

        if (selectedClientId) {
            const formData = new FormData();
            formData.append("client_id", selectedClientId);

            axios
                .post("http://localhost:8000/contact/person/search", formData)
                .then((response) => {
                    setStaffData(response.data);
                })
                .catch((error) => {
                    console.error("Person Fetch Error:", error);
                    setStaffData([]);
                });
        }
    };

    const clientOptions = clientData.map((client) => ({
        value: client.id,
        label: `${client.name}`,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const quotationData = {
            ...formData,
            status: "draft",
            createdAt: new Date().toISOString(),
        };

        console.log("Submitting quotation:", quotationData);
    };

    const [isdragging, setisdragging] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState("");
    const fileInputRef = useRef(null);
    const theme = useTheme();

    const handleDragOver = (e) => {
        e.preventDefault();
        setisdragging(true);
    };

    const handleDragLeave = () => {
        setisdragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setisdragging(false);
        const file = e.dataTransfer.files[0];
        handlePdfFile(file);
    };

    const handleContainerClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handlePdfFile(file);
    };

    const handleClearPdf = () => {
        setPdfFile(null);
        setPdfUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handlePdfFile = (file) => {
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file");
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            alert("File size exceeds 20MB limit");
            return;
        }

        setPdfFile(file);
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
    };

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Box
                component="form"
                onSubmit={handleSubmit}
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
                    <Box>
                        <Typography variant="h4" component="h1" color="primary">
                            Add New Invoice
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                        >
                            Add new Client
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 2, p: 2 }}>
                    <Box sx={{ flex: "0 0 50%" }}>
                        <Grid container spacing={4} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Client{" "}
                                    <Box
                                        component="span"
                                        sx={{ color: "error.main" }}
                                    >
                                        *
                                    </Box>
                                </Typography>
                                <FormControl fullWidth error={errors.client}>
                                    <Autocomplete
                                        size="small"
                                        options={clientData}
                                        getOptionLabel={(option) => option.name}
                                        value={
                                            clientData.find(
                                                (c) => c.id === formData.client
                                            ) || null
                                        }
                                        onChange={handleClientSelect}
                                        onOpen={fetchClients}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                placeholder="-- Select Client --"
                                                error={errors.client}
                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) =>
                                            option.id === value.id
                                        }
                                        fullWidth
                                    />
                                    {errors.client && (
                                        <Typography
                                            variant="caption"
                                            color="error"
                                        >
                                            Client is required
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        {formData.persons.map((person, index) => (
                            <Grid
                                container
                                spacing={4}
                                sx={{ mb: 3 }}
                                key={index}
                            >
                                <Grid size={{ xs: 12, sm: 5 }}>
                                    <Typography sx={{ mb: 1 }}>
                                        Person in Charge{" "}
                                        <Box
                                            component="span"
                                            sx={{ color: "error.main" }}
                                        >
                                            *
                                        </Box>
                                    </Typography>
                                    <FormControl
                                        fullWidth
                                        error={
                                            errors.persons[index]
                                                ?.personInCharge
                                        }
                                    >
                                        <Autocomplete
                                            size="small"
                                            disabled={!isClientSelected}
                                            options={staffData}
                                            getOptionLabel={(option) =>
                                                option.name
                                            }
                                            value={
                                                staffData.find(
                                                    (s) =>
                                                        s.id ===
                                                        person.personInCharge
                                                ) ||
                                                (person.personInCharge
                                                    ? {
                                                          id: person.personInCharge,
                                                          name: person.personInCharge,
                                                          email: person.emailAddress,
                                                      }
                                                    : null)
                                            }
                                            onChange={(event, newValue) => {
                                                const selectedId =
                                                    newValue?.id || "";
                                                const selectedPerson =
                                                    staffData.find(
                                                        (p) =>
                                                            p.id === selectedId
                                                    ) || newValue;
                                                handlePersonChange(
                                                    index,
                                                    "personInCharge",
                                                    selectedId
                                                );
                                                handlePersonChange(
                                                    index,
                                                    "emailAddress",
                                                    selectedPerson?.email || ""
                                                );
                                            }}
                                            freeSolo
                                            renderInput={(params) => (
                                                <TextField
                                                    size="small"
                                                    placeholder="-- Select person in charge --"
                                                    {...params}
                                                    error={
                                                        errors.persons[index]
                                                            ?.personInCharge
                                                    }
                                                />
                                            )}
                                            isOptionEqualToValue={(
                                                option,
                                                value
                                            ) => option.id === value.id}
                                        />
                                        {errors.persons[index]
                                            ?.personInCharge && (
                                            <Typography
                                                variant="caption"
                                                color="error"
                                            >
                                                Person in charge is required
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, sm: 5 }}>
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
                                        name={`emailAddress-${index}`}
                                        type="email"
                                        placeholder="Enter email address"
                                        value={person.emailAddress}
                                        onChange={(e) =>
                                            handlePersonChange(
                                                index,
                                                "emailAddress",
                                                e.target.value
                                            )
                                        }
                                        error={
                                            errors.persons[index]?.emailAddress
                                        }
                                        helperText={
                                            errors.persons[index]?.emailAddress
                                                ? person.emailAddress
                                                    ? "Invalid email format"
                                                    : "Email is required"
                                                : ""
                                        }
                                        disabled={!isClientSelected}
                                    />
                                </Grid>

                                <Grid
                                    size={{ xs: 12, sm: 2 }}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    {formData.persons.length > 1 && (
                                        <IconButton
                                            color="error"
                                            onClick={() => removePerson(index)}
                                            aria-label="delete"
                                            sx={{ mt: 3 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        ))}

                        <Box sx={{ mt: 2, mb: 3 }}>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addPerson}
                                type="button"
                            >
                                Add New Person
                            </Button>
                        </Box>

                        <Grid container spacing={4} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Billing Date{" "}
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
                                    type="date"
                                    name="billingDate"
                                    value={formData.billingDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "billingDate",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
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
                                    type="date"
                                    name="closingDate"
                                    value={formData.closingDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "closingDate",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Collection Date{" "}
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
                                    type="date"
                                    name="collectionDate"
                                    value={formData.collectionDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "collectionDate",
                                            e.target.value
                                        )
                                    }
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={4}
                            sx={{
                                mb: 3,
                                border: "1px solid #e0e0e0",
                                borderRadius: 1,
                                p: 2,
                            }}
                        >
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Display of Consumption Tax{" "}
                                    <Box
                                        component="span"
                                        sx={{ color: "error.main" }}
                                    >
                                        *
                                    </Box>
                                </Typography>
                                <FormControl component="fieldset" fullWidth>
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
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>Amount *</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "amount",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Tax Amount
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="taxAmount"
                                    placeholder="Enter Tax Amount"
                                    value={formData.taxAmount}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "taxAmount",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>Subtotal</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="subtotal"
                                    value={formData.subtotal}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Total Amount
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="totalAmount"
                                    value={formData.totalAmount}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            flex: "0 0 50%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <PdfContainer
                            isDragging={isdragging}
                            hasPdf={!!pdfUrl}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleContainerClick}
                        >
                            {!pdfUrl ? (
                                <PdfPreviewContainer>
                                    <PictureAsPdfIcon
                                        sx={{
                                            fontSize: 64,
                                            color: theme.palette.text.secondary,
                                            mb: 2,
                                        }}
                                    />
                                    <Typography
                                        variant="body1"
                                        color="textSecondary"
                                    >
                                        Drag and drop a PDF here, or click to
                                        select one
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary"
                                        mt={1}
                                    >
                                        Max file size: 20MB
                                    </Typography>
                                </PdfPreviewContainer>
                            ) : (
                                <PdfViewer
                                    src={`${pdfUrl}#toolbar=1&navpanes=0`}
                                    title="PDF Preview"
                                />
                            )}
                            <HiddenInput
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="application/pdf"
                            />
                        </PdfContainer>

                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleContainerClick}
                                fullWidth
                            >
                                Select PDF
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleClearPdf}
                                fullWidth
                                disabled={!pdfUrl}
                            >
                                Clear PDF
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* action buttons section */}
                <Box
                    sx={{ display: "flex", justifyContent: "flex-start", p: 2 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mr: 2 }}
                    >
                        Register
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            window.location.href = "/management/quotation";
                        }}
                        type="button"
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
}
