import { useIntl } from "react-intl";
import { Link } from "react-router";
import { Breadcrumbs as MUIBreadcrumbs, Typography, Box } from "@mui/material";

export default function CustomBreadcrumbs({ items }) {
  const { formatMessage } = useIntl();
  return (
    <Box sx={{ backgroundColor: "#ECEFF1", p: 2, borderRadius: 2 }}>
      <MUIBreadcrumbs aria-label="breadcrumb" separator=" / ">
        {items.map((item, index) =>
          item.href ? (
            <Link
              key={index}
              to={item.href}
              style={{ color: "#000", textDecoration: "none" }}
            >
              {formatMessage({ id: item.label })}
            </Link>
          ) : (
            <Typography key={index} sx={{ color: "#000" }}>
              {formatMessage({ id: item.label })}
            </Typography>
          )
        )}
      </MUIBreadcrumbs>
    </Box>
  );
}
