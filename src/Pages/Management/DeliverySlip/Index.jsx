import React, { useState } from "react";
import Layout from "../../../Layout/Layout";
import { Box, Button, Link } from "@mui/material";

export default function QuotationTable() {
  const breadcrumbs = [
    { label: "Management" },
    { label: "Delivery Slip", href: "/management/delivery" },
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
          to="/management/delivery/create"
          variant="contained"
          color="primary"
        >
          Create Delivery Slip
        </Button>
      </Box>
    </Layout>
  );
}
