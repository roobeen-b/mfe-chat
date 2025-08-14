import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import {
    Box,
    Button,
    Select,
    MenuItem,
    TextField,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Link,
} from "@mui/material";
import {
    Edit,
    Delete,
    Visibility,
    ArrowBackIos,
    ArrowForwardIos,
    CheckCircle,
    Cancel,
} from "@mui/icons-material";

export default function QuotationTable() {
    const breadcrumbs = [
        { label: "Management" },
        { label: "Quotation", href: "/management/quotation" },
    ];

    const data = [
        {
            client: "Ram Shrestha",
            personInCharge: "Maria Sharapova",
            receiverStatus: "Unopened",
            authorization: [true, false],
            approvalStatus: "Unapproved",
        },
        {
            client: "Jonah Hill",
            personInCharge: "Faf Du Plessis",
            receiverStatus: "Opened",
            authorization: [true],
            approvalStatus: "Approved",
        },
        {
            client: "Rose Namjunas",
            personInCharge: "Ram Shrestha",
            receiverStatus: "Unopened",
            receiverNote: "Sent Back",
            authorization: [true],
            approvalStatus: "Sent Back",
        },
        {
            client: "Faf Du Plessis",
            personInCharge: "Jonah Hill",
            receiverStatus: "Approved",
            authorization: [true, false],
            approvalStatus: "Unapproved",
        },
        {
            client: "Maria Sharapova",
            personInCharge: "Rose Namjunas",
            receiverStatus: "Opened",
            authorization: [true],
            approvalStatus: "Approved",
        },
    ];

    const getChip = (label, color, variant = "filled") => (
        <Chip label={label} color={color} variant={variant} size="small" />
    );

    const getStatusChip = (status) => {
        switch (status) {
            case "Unopened":
                return getChip("Unopened", "warning");
            case "Opened":
                return getChip("Opened", "warning", "outlined");
            case "Approved":
                return getChip("Approved", "info");
            case "Unapproved":
                return getChip("Unapproved", "default");
            case "Sent Back":
                return getChip("Sent Back", "error");
            default:
                return null;
        }
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
                        justifyContent: "center",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Button variant="contained" startIcon={<ArrowBackIos />}>
                        January
                    </Button>
                    <Button variant="outlined">February</Button>
                    <Button variant="contained" endIcon={<ArrowForwardIos />}>
                        March
                    </Button>
                </Box>

                {/* Filter Tabs */}
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                    <Button variant="outlined">Received</Button>
                    <Button variant="outlined">New</Button>
                    <Button variant="contained">Sent</Button>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="outlined">Filter</Button>
                    <TextField size="small" placeholder="Search..." />
                </Box>

                {/* Status Summary */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Chip label="Approved: 6" color="success" />
                        <Chip label="Unapproved: 2" color="error" />
                        <Chip label="Sent Back: 2" color="warning" />
                        <Chip
                            label="Returned: 0"
                            color="info"
                            variant="outlined"
                        />
                    </Box>
                    <Box>
                        <Button
                            component={Link}
                            href="/management/quotation/create"
                            variant="contained"
                            color="primary"
                        >
                            Create Quotation
                        </Button>
                    </Box>
                </Box>

                {/* Table */}
                <TableContainer sx={{ mb: 4 }}>
                    <Box sx={{ p: 2 }}>
                        <Select size="small" defaultValue={5} sx={{ mb: 2 }}>
                            <MenuItem value={5}>Show 5</MenuItem>
                            <MenuItem value={10}>Show 10</MenuItem>
                        </Select>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#039BE5" }}>
                                <TableCell sx={{ color: "white" }}>
                                    Quotation Number
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Client
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Person In Charge
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Receiver Status
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Authorization
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Approval Status
                                </TableCell>
                                <TableCell sx={{ color: "white" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>157-1-1</TableCell>
                                    <TableCell>{row.client}</TableCell>
                                    <TableCell>{row.personInCharge}</TableCell>
                                    <TableCell>
                                        {getStatusChip(row.receiverStatus)}
                                        {row.receiverNote && (
                                            <Box mt={1}>
                                                {getStatusChip(
                                                    row.receiverNote
                                                )}
                                            </Box>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {row.authorization?.map((auth, i) =>
                                            auth ? (
                                                <CheckCircle
                                                    key={i}
                                                    color="success"
                                                />
                                            ) : (
                                                <Cancel key={i} color="error" />
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusChip(row.approvalStatus)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="info">
                                            <Visibility />
                                        </IconButton>
                                        <IconButton color="error">
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
}
