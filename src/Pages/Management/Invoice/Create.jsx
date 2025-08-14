import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import {
    Box,
    Typography,
    Grid,
    FormControl,
    FormControlLabel,
    TextField,
    Radio,
    RadioGroup,
    Select,
    MenuItem,
    Divider,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function CreateInvoice() {
    const breadcrumbs = [
        { label: "Management" },
        { label: "Invoice", href: "/management/invoice" },
        { label: "Create", href: "/management/invoice/create" },
    ];

    const [showInvoiceTax, setShowInvoiceTax] = useState(false);
    const [showInvoiceSource, setShowInvoiceSource] = useState(false);

    const handleTaxToggle = () => {
        setShowInvoiceTax((prev) => !prev);
    };

    const handleSourceToggle = () => {
        setShowInvoiceSource((prev) => !prev);
    };

    const [formData, setFormData] = useState({
        client: "",
        persons: [
            {
                personInCharge: "",
                emailAddress: "",
            },
        ],
        closingDate: "",
        collectionDate: "",
        billingDate: "",
        taxConsumption: "0",
        taxRate: "1",
        postalCode: "",
        prefecture: "",
        municipality: "",
        streetAddress: "",
        buildingName: "",
    });

    const [items, setItems] = useState([
        {
            id: 1,
            productName: "",
            quantity: "",
            unit: "",
            unitPrice: "",
            amount: 0,
            taxRate: "10",
            remarks: "",
        },
    ]);

    const [errors, setErrors] = useState({
        client: false,
        persons: [{ personInCharge: false, emailAddress: false }],
        invoiceDate: false,
        expiryDate: false,
        billingDate: false,
        subject: false,
        items: [{ productName: false, quantity: false, unitPrice: false }],
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
            invoiceDate: !formData.invoiceDate,
            expiryDate: !formData.expiryDate,
            billingDate: !formData.billingDate,
            subject: !formData.subject,
            items: items.map((item) => ({
                productName: !item.productName,
                quantity:
                    !item.quantity ||
                    isNaN(item.quantity) ||
                    parseFloat(item.quantity) <= 0,
                unitPrice:
                    !item.unitPrice ||
                    isNaN(item.unitPrice) ||
                    parseFloat(item.unitPrice) <= 0,
            })),
        };

        setErrors(newErrors);

        if (
            newErrors.client ||
            newErrors.invoiceDate ||
            newErrors.expiryDate ||
            newErrors.billingDate ||
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

        for (const itemError of newErrors.items) {
            if (
                itemError.productName ||
                itemError.quantity ||
                itemError.unitPrice
            ) {
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

        const updatedErrors = { ...errors };
        updatedErrors.persons = updatedErrors.persons.filter(
            (_, i) => i !== index
        );
        setErrors(updatedErrors);
    };

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                id: items.length + 1,
                productName: "",
                quantity: "",
                unit: "",
                unitPrice: "",
                amount: 0,
                taxRate: "10",
                remarks: "",
            },
        ]);

        setErrors((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    productName: false,
                    quantity: false,
                    unitPrice: false,
                },
            ],
        }));
    };

    const handleRemoveItem = (id) => {
        const index = items.findIndex((item) => item.id === id);
        setItems(items.filter((item) => item.id !== id));

        const updatedErrors = { ...errors };
        updatedErrors.items = updatedErrors.items.filter((_, i) => i !== index);
        setErrors(updatedErrors);
    };

    const handleItemChange = (id, field, value) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    if (
                        (field === "quantity" || field === "unitPrice") &&
                        !isNaN(value)
                    ) {
                        const newQuantity =
                            field === "quantity"
                                ? parseFloat(value)
                                : parseFloat(item.quantity);
                        const newUnitPrice =
                            field === "unitPrice"
                                ? parseFloat(value)
                                : parseFloat(item.unitPrice);
                        const newAmount = newQuantity * newUnitPrice;

                        return {
                            ...item,
                            [field]: value,
                            amount: isNaN(newAmount) ? 0 : newAmount,
                        };
                    }
                    return { ...item, [field]: value };
                }
                return item;
            })
        );

        const index = items.findIndex((item) => item.id === id);
        if (errors.items[index] && errors.items[index][field]) {
            const updatedErrors = { ...errors };
            updatedErrors.items[index][field] = false;
            setErrors(updatedErrors);
        }
    };

    const calculateTotals = () => {
        let subtotal = 0;
        const taxSummary = {
            tax10: { amount: 0, tax: 0 },
            tax8: { amount: 0, tax: 0 },
        };

        items.forEach((item) => {
            const amount = parseFloat(item.amount) || 0;
            subtotal += amount;

            if (item.taxRate === "10") {
                taxSummary.tax10.amount += amount;
                taxSummary.tax10.tax += amount * 0.1;
            } else if (item.taxRate === "8") {
                taxSummary.tax8.amount += amount;
                taxSummary.tax8.tax += amount * 0.08;
            }
        });

        const totalTax = taxSummary.tax10.tax + taxSummary.tax8.tax;
        const total = subtotal + totalTax;

        return {
            subtotal,
            totalTax,
            total,
            taxSummary,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const totals = calculateTotals();

        const invoiceData = {
            ...formData,
            items,
            totals,
            status: "draft",
            createdAt: new Date().toISOString(),
        };

        console.log("Submitting invoice:", invoiceData);
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
                {/* Header section */}
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
                <Divider sx={{ mb: 4 }} />

                {/* Client Information section */}
                <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                    <Box sx={{ flex: "0 0 30%" }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Client Information
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
                                    Client{" "}
                                    <Box
                                        component="span"
                                        sx={{ color: "error.main" }}
                                    >
                                        *
                                    </Box>
                                </Typography>
                                <FormControl
                                    fullWidth
                                    size="small"
                                    error={errors.client}
                                >
                                    <Select
                                        name="client"
                                        displayEmpty
                                        value={formData.client}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "client",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <MenuItem value="" disabled>
                                            -- Select Client --
                                        </MenuItem>
                                        <MenuItem value="Ram">Ram Plc</MenuItem>
                                        <MenuItem value="hari">
                                            Hari Ltd
                                        </MenuItem>
                                        <MenuItem value="sita">
                                            Sita & Sons
                                        </MenuItem>
                                    </Select>
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
                                        size="small"
                                        error={
                                            errors.persons[index]
                                                ?.personInCharge
                                        }
                                    >
                                        <Select
                                            name={`personInCharge-${index}`}
                                            displayEmpty
                                            value={person.personInCharge}
                                            onChange={(e) =>
                                                handlePersonChange(
                                                    index,
                                                    "personInCharge",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <MenuItem value="" disabled>
                                                -- Select Person in Charge --
                                            </MenuItem>
                                            <MenuItem value="test1">
                                                test1
                                            </MenuItem>
                                            <MenuItem value="test2">
                                                test2
                                            </MenuItem>
                                            <MenuItem value="test3">
                                                test3
                                            </MenuItem>
                                        </Select>
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

                        <Box sx={{ mt: 2 }}>
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={addPerson}
                                type="button"
                            >
                                Add New Person
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Invoice Details section */}
                <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                    <Box sx={{ flex: "0 0 30%" }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Invoice Details
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
                                    value={formData.closingDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "closingDate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.closingDate}
                                    helperText={
                                        errors.closingDate
                                            ? "Invoice date is required"
                                            : ""
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
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
                                    value={formData.collectionDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "collectionDate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.collectionDate}
                                    helperText={
                                        errors.collectionDate
                                            ? "Expiry date is required"
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
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
                                    value={formData.billingDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "billingDate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.billingDate}
                                    helperText={
                                        errors.billingDate
                                            ? "Billing date is required"
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Address Information section */}
                <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                    <Box sx={{ flex: "0 0 30%" }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Address Information
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
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Postal Code *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={formData.postalCode}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "postalCode",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Prefectures *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={formData.prefecture}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "prefecture",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 5 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Municipality *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={formData.municipality}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "municipality",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Street Address *
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={formData.streetAddress}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "streetAddress",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Typography sx={{ mb: 1 }}>
                                    Building name, room number etc.
                                </Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={formData.buildingName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "buildingName",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Invoice Source section */}
                <Box sx={{ p: 2 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Change Invoice Source
                        </Typography>
                        <IconButton onClick={handleSourceToggle}>
                            {showInvoiceSource ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </IconButton>
                    </Box>
                    <Collapse in={showInvoiceSource}>
                        <Box sx={{ display: "flex", gap: 4 }}>
                            <Box sx={{ flex: "0 0 30%" }}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{ mb: 1 }}
                                >
                                    Invoice Source
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
                                            Billing Source
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Registration Number
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Telephone Number
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Fax Number
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 3 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Postal Code *
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Prefectures *
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 5 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Municipality *
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Street Address *
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Building name, room number etc.
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Payee Bank
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Branch Name
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Account Type
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Account Number
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={4} sx={{ mb: 3 }}>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Account Holder Name *
                                        </Typography>
                                        <TextField fullWidth size="small" />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Invoice Condition section */}
                <Box sx={{ p: 2 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Change Invoice Condition
                        </Typography>
                        <IconButton onClick={handleTaxToggle}>
                            {showInvoiceTax ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </IconButton>
                    </Box>

                    <Collapse in={showInvoiceTax}>
                        <Box sx={{ display: "flex", gap: 4 }}>
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
                                    You have the authority to manage and oversee
                                    all billing and payment records.
                                </Typography>
                            </Box>

                            <Box sx={{ flex: "0 0 70%", pr: 4 }}>
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
                                    <Grid size={{ xs: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Display of Consumption Tax{" "}
                                            <Box
                                                component="span"
                                                sx={{ color: "error.main" }}
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
                                    <Grid size={{ xs: 12 }}>
                                        <Typography sx={{ mb: 1 }}>
                                            Tax Rate{" "}
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
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Consumption Tax section */}
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                        Consumption Tax
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        You are authorized to configure company-wide settings
                        and operational preferences.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 4 }}>
                        <Box sx={{ flex: "0 0 50%" }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Product Summary
                            </Typography>
                            <TableContainer component={Paper} sx={{ mb: 4 }}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                                        <TableRow>
                                            <TableCell>Subtotal</TableCell>
                                            <TableCell>
                                                Consumption Tax
                                            </TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                {calculateTotals().subtotal.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {calculateTotals().totalTax.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {calculateTotals().total.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box sx={{ flex: "0 0 50%", pr: 4 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Tax Summary
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table size="small">
                                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                                        <TableRow>
                                            <TableCell>Tax Details</TableCell>
                                            <TableCell>
                                                Consumption Tax (Yen)
                                            </TableCell>
                                            <TableCell>Total (Yen)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>10% Target</TableCell>
                                            <TableCell>
                                                {calculateTotals().taxSummary.tax10.tax.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {calculateTotals().taxSummary.tax10.amount.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>8% Target</TableCell>
                                            <TableCell>
                                                {calculateTotals().taxSummary.tax8.tax.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {calculateTotals().taxSummary.tax8.amount.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Invoice Items section */}
                <Box sx={{ p: 2 }}>
                    <Box>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Invoice Items
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

                    <Box sx={{ pr: 4 }}>
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: "#f5f5f5" }}
                                    >
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            No
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Product Name*
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Quantity*
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Unit
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Unit Price*
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Amount
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Tax Rate
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Remarks
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {items.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={item.productName}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "productName",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors.items[index]
                                                            ?.productName
                                                    }
                                                    helperText={
                                                        errors.items[index]
                                                            ?.productName
                                                            ? "Product name is required"
                                                            : ""
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "quantity",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors.items[index]
                                                            ?.quantity
                                                    }
                                                    helperText={
                                                        errors.items[index]
                                                            ?.quantity
                                                            ? item.quantity
                                                                ? "Must be a positive number"
                                                                : "Quantity is required"
                                                            : ""
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={item.unit}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "unit",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "unitPrice",
                                                            e.target.value
                                                        )
                                                    }
                                                    error={
                                                        errors.items[index]
                                                            ?.unitPrice
                                                    }
                                                    helperText={
                                                        errors.items[index]
                                                            ?.unitPrice
                                                            ? item.unitPrice
                                                                ? "Must be a positive number"
                                                                : "Unit price is required"
                                                            : ""
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {item.amount.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    size="small"
                                                    value={item.taxRate}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "taxRate",
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <MenuItem value="10">
                                                        10%
                                                    </MenuItem>
                                                    <MenuItem value="8">
                                                        8%
                                                    </MenuItem>
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={item.remarks}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            item.id,
                                                            "remarks",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {items.length > 1 && (
                                                    <IconButton
                                                        color="error"
                                                        aria-label="delete"
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow
                                        sx={{
                                            backgroundColor: "#fafafa",
                                            height: 50,
                                        }}
                                    >
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Subtotal
                                        </TableCell>
                                        <TableCell colSpan={3}></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            {calculateTotals().subtotal.toFixed(
                                                2
                                            )}
                                        </TableCell>
                                        <TableCell colSpan={3}></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleAddItem}
                                type="button"
                            >
                                Add Another Item
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* Action Buttons section */}
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
                            window.location.href = "/management/invoice";
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
