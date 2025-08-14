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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function CreateDeliverySlip() {
    const breadcrumbs = [
        { label: "Management" },
        { label: "Delivery Slip", href: "/management/delivery" },
        { label: "Create", href: "/management/delivery/create" },
    ];

    const [formData, setFormData] = useState({
        client: "",
        persons: [
            {
                personInCharge: "",
                emailAddress: "",
            },
        ],
        deliveryDate: "",
        taxConsumption: "0", // 0 for exclusive, 1 for inclusive
        taxRate: "1", // 0 for 8%, 1 for 10%
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
        deliveryDate: false,
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
            deliveryDate: !formData.deliveryDate,
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

        // Check if any error exists
        if (newErrors.client || newErrors.deliveryDate) {
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

        // Add corresponding error object for new item
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

        // Remove corresponding error object
        const updatedErrors = { ...errors };
        updatedErrors.items = updatedErrors.items.filter((_, i) => i !== index);
        setErrors(updatedErrors);
    };

    const handleItemChange = (id, field, value) => {
        setItems(
            items.map((item) => {
                if (item.id === id) {
                    // Calculate amount if quantity or unitPrice changes
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

        // Clear error when field is filled
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

        const deliveryData = {
            ...formData,
            items,
            totals,
            status: "draft",
            createdAt: new Date().toISOString(),
        };

        console.log("Submitting quotation:", deliveryData);
    };

    const totals = calculateTotals();

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
                            Add New Delivery Slip
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

                {/* select client */}
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

                {/* delivery information section */}
                <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                    <Box sx={{ flex: "0 0 30%" }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Delivery Information
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
                                    Delivery Date{" "}
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
                                    name="deliveryDate"
                                    value={formData.deliveryDate}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "deliveryDate",
                                            e.target.value
                                        )
                                    }
                                    error={errors.deliveryDate}
                                    helperText={
                                        errors.deliveryDate
                                            ? "Delivery date is required"
                                            : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Divider sx={{ mb: 4 }} />

                {/* invoice condition section */}
                <Box sx={{ display: "flex", gap: 4, p: 2 }}>
                    <Box sx={{ flex: "0 0 30%" }}>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
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

                    {/* Condition section */}
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
                <Divider sx={{ mb: 4 }} />

                {/* consumption tax and dispaly section */}
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
                                                {totals.subtotal.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {totals.totalTax.toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {totals.total.toFixed(2)}
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
                                                {totals.taxSummary.tax10.tax.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totals.taxSummary.tax10.amount.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>8% Target</TableCell>
                                            <TableCell>
                                                {totals.taxSummary.tax8.tax.toFixed(
                                                    2
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {totals.taxSummary.tax8.amount.toFixed(
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

                {/* delivery slip items section */}
                <Box sx={{ p: 2 }}>
                    <Box>
                        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                            Delivery Slip Items
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
                                        <TableCell colSpan={3}></TableCell>{" "}
                                        <TableCell></TableCell>{" "}
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            {calculateTotals().subtotal.toFixed(
                                                2
                                            )}
                                        </TableCell>
                                        <TableCell colSpan={3}></TableCell>{" "}
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

                {/* action buttons */}
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
                            window.location.href = "/management/delivery";
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
