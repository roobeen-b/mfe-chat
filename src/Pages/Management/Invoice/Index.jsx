import React, { useState } from "react";
import Layout from "../../../Layout/Layout"
import { Box, Button, Link } from "@mui/material";

export default function QuotationTable() {
    const breadcrumbs = [
        { label: "Management" },
        { label: "Invoice", href: "/management/invoice" },
    ];

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
                <Button
                    component={Link}
                    href="/management/invoice/create"
                    variant="contained"
                    color="primary"
                >
                    Create Invoice
                </Button>
            </Box>
        </Layout>
    );
}
