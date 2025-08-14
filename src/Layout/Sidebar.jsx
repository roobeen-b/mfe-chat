import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  styled,
  ListItemIcon,
  Tooltip,
  Popover,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Send as SendIcon,
  RequestQuote as QuotationIcon,
  LocalShipping as DeliveryIcon,
  Receipt as InvoiceIcon,
  Schedule as ScheduleIcon,
  Payment as WithdrawalIcon,
  AccountBalance as DepositIcon,
  Storage as MasterDataIcon,
  People as CustomerIcon,
  Inventory as ProductsIcon,
  Business as CompanyIcon,
  Settings as SettingsIcon,
  Groups as StaffIcon,
  Email as EmailIcon,
  Subscriptions as SubscriptionsIcon,
  Book as BookIcon,
} from "@mui/icons-material";
import { useIntl } from "react-intl";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const [openMenu, setOpenMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState([]);
  const [popoverTitle, setPopoverTitle] = useState("");
  const [isPopoverSticky, setIsPopoverSticky] = useState(false);
  const popoverTimeoutRef = useRef(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current);
      }
    };
  }, []);

  // Keep relevant menus open based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/company-setting")) {
      setOpenMenu("companySettings");
    } else if (path.startsWith("/management")) {
      setOpenMenu("management");
    } else if (path.startsWith("/schedule")) {
      setOpenMenu("schedule");
    } else if (path.startsWith("/master-data")) {
      setOpenMenu("masterData");
    }
  }, [location.pathname]);

  const toggleMenu = (menu, e) => {
    if (isSidebarOpen) {
      // If sidebar is open, toggle the collapse
      setOpenMenu(openMenu === menu ? null : menu);
    } else {
      // If sidebar is collapsed, show popover
      setAnchorEl(e.currentTarget);

      if (isPopoverSticky && openMenu === menu) {
        handlePopoverClose();
      } else {
        const menuItems = getMenuItemsByKey(menu);
        const menuTitle = getMenuTitleByKey(menu);
        setPopoverContent(menuItems);
        setPopoverTitle(menuTitle);
        setOpenMenu(menu);
        setIsPopoverSticky(true);
      }
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsPopoverSticky(false);
    // Don't reset openMenu here to keep it open when sidebar is expanded
  };

  const handleClickAway = () => {
    if (isPopoverSticky) {
      setIsPopoverSticky(false);
      setAnchorEl(null);
    }
  };

  const getMenuItemsByKey = (key) => {
    switch (key) {
      case "management":
        return managementMenuItems;
      case "schedule":
        return scheduleMenuItems;
      case "masterData":
        return masterDataMenuItems;
      case "companySettings":
        return companySettingsMenuItems;
      default:
        return [];
    }
  };

  const getMenuTitleByKey = (key) => {
    switch (key) {
      case "management":
        return "send_receive_management";
      case "schedule":
        return "deposit_withdrawal_schedule";
      case "masterData":
        return "master_data_management";
      case "companySettings":
        return "company_settings";
      default:
        return "";
    }
  };

  const isActive = (href) => {
    const currentPath = location.pathname;
    return (
      currentPath === href ||
      (href !== "#" && currentPath.startsWith(href)) ||
      (href === "/dashboard" && currentPath === "/")
    );
  };

  // Check if any submenu item is active
  const isSubmenuActive = (menuItems) => {
    return menuItems.some((item) => isActive(item.href));
  };

  const open = Boolean(anchorEl) && !isSidebarOpen && isPopoverSticky;

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0.5),
    ...theme.mixins.toolbar,
    justifyContent: "center",
  }));

  const managementMenuItems = [
    {
      name: "quotation",
      icon: <QuotationIcon fontSize="small" />,
      href: "/management/quotation",
    },
    {
      name: "delivery_slip",
      icon: <DeliveryIcon fontSize="small" />,
      href: "/management/delivery",
    },
    {
      name: "invoice",
      icon: <InvoiceIcon fontSize="small" />,
      href: "/management/invoice",
    },
  ];

  const scheduleMenuItems = [
    {
      name: "scheduled_withdrawal_list",
      icon: <WithdrawalIcon fontSize="small" />,
      href: "#",
    },
    {
      name: "scheduled_deposit_list",
      icon: <DepositIcon fontSize="small" />,
      href: "#",
    },
  ];

  const masterDataMenuItems = [
    {
      name: "customer_supplier",
      icon: <CustomerIcon fontSize="small" />,
      href: "/master-data/supplier",
    },
    {
      name: "products",
      icon: <ProductsIcon fontSize="small" />,
      href: "#",
    },
  ];

  const companySettingsMenuItems = [
    {
      name: "company",
      icon: <CompanyIcon fontSize="small" />,
      href: "/company-setting/information",
    },
    {
      name: "staff",
      icon: <StaffIcon fontSize="small" />,
      href: "/company-setting/staff",
    },
    {
      name: "email_receptions",
      icon: <EmailIcon fontSize="small" />,
      href: "#",
    },
    {
      name: "subscriptions",
      icon: <SubscriptionsIcon fontSize="small" />,
      href: "#",
    },
  ];

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Drawer
          variant="permanent"
          sx={{
            width: isSidebarOpen ? 263 : 60,
            flexShrink: 0,
            overflowX: "hidden",
            "& .MuiDrawer-paper": {
              width: isSidebarOpen ? 263 : 60,
              boxSizing: "border-box",
              backgroundColor: "#009FFD",
              color: "white",
              transition: "width 0.3s ease",
              overflowX: "hidden",
            },
          }}
        >
          <DrawerHeader>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: isSidebarOpen ? "1.3rem" : "0.9rem",
                opacity: isSidebarOpen ? 1 : 0.8,
                whiteSpace: "nowrap",
                overflow: "visible",
                maxWidth: "none",
              }}
            >
              MBN
            </h2>
          </DrawerHeader>

          <List
            sx={{
              overflow: "visible",
              "& .MuiListItemButton-root": {
                minHeight: 44,
                px: isSidebarOpen ? 1.5 : 0,
                py: 0.5,
                justifyContent: isSidebarOpen ? "initial" : "center",
                "&:hover": {
                  backgroundColor: isSidebarOpen
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.2)",
                  borderRadius: isSidebarOpen ? 0 : 4,
                },
              },
              "& .MuiListItemIcon-root": {
                minWidth: isSidebarOpen ? "auto" : 60,
                mr: isSidebarOpen ? 1.5 : 0,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                color: "inherit",
                fontSize: isSidebarOpen ? "1rem" : "1.2rem",
              },
              "& .MuiListItemText-root": {
                opacity: isSidebarOpen ? 1 : 0,
                whiteSpace: "nowrap",
                overflow: "visible",
                "& .MuiTypography-root": {
                  fontSize: "0.875rem",
                },
              },
              "& .MuiCollapse-root .MuiListItemButton-root": {
                justifyContent: isSidebarOpen ? "initial" : "center",
                pl: isSidebarOpen ? 4 : 0,
                minHeight: 40,
                "&:hover": {
                  backgroundColor: isSidebarOpen
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(255, 255, 255, 0.2)",
                  borderRadius: isSidebarOpen ? 0 : 4,
                },
              },
              "& .MuiCollapse-root .MuiListItemIcon-root": {
                minWidth: isSidebarOpen ? "auto" : 60,
                mr: isSidebarOpen ? 1.5 : 0,
              },
            }}
          >
            {/* Dashboard */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title="Dashboard"
                placement="right"
                disableHoverListener={isSidebarOpen}
                arrow
              >
                <ListItemButton
                  component={Link}
                  href="/dashboard"
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor: isActive("/dashboard")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "dashboard",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>

            {/* Management Menu */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title={formatMessage({
                  id: "send_receive_management",
                })}
                placement="right"
                disableHoverListener={
                  isSidebarOpen || openMenu === "management"
                }
                arrow
              >
                <ListItemButton
                  onClick={(e) => toggleMenu("management", e)}
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor:
                      (!isSidebarOpen && openMenu === "management") ||
                      (!isSidebarOpen && isSubmenuActive(managementMenuItems))
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    borderRadius:
                      !isSidebarOpen && openMenu === "management" ? 1 : 0,
                  }}
                >
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "send_receive_management",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                  {isSidebarOpen &&
                    (openMenu === "management" ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            <Collapse
              in={isSidebarOpen && openMenu === "management"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {managementMenuItems.map((item, index) => (
                  <Tooltip
                    key={index}
                    title={item.name}
                    placement="right"
                    disableHoverListener={isSidebarOpen}
                    arrow
                  >
                    <ListItemButton
                      component={item.href !== "#" ? Link : "div"}
                      href={item.href !== "#" ? item.href : undefined}
                      sx={{
                        py: 0.5,
                        backgroundColor: isActive(item.href)
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={formatMessage({
                          id: item.name,
                        })}
                        sx={{
                          opacity: isSidebarOpen ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                ))}
              </List>
            </Collapse>

            {/* Deposit/Withdrawal Menu */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title={formatMessage({
                  id: "deposit_withdrawal_schedule",
                })}
                placement="right"
                disableHoverListener={isSidebarOpen || openMenu === "schedule"}
                arrow
              >
                <ListItemButton
                  onClick={(e) => toggleMenu("schedule", e)}
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor:
                      (!isSidebarOpen && openMenu === "schedule") ||
                      (!isSidebarOpen && isSubmenuActive(scheduleMenuItems))
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    borderRadius:
                      !isSidebarOpen && openMenu === "schedule" ? 1 : 0,
                  }}
                >
                  <ListItemIcon>
                    <ScheduleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "deposit_withdrawal_schedule",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                  {isSidebarOpen &&
                    (openMenu === "schedule" ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            <Collapse
              in={isSidebarOpen && openMenu === "schedule"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {scheduleMenuItems.map((item, index) => (
                  <Tooltip
                    key={index}
                    title={item.name}
                    placement="right"
                    disableHoverListener={isSidebarOpen}
                    arrow
                  >
                    <ListItemButton
                      component={item.href !== "#" ? Link : "div"}
                      href={item.href !== "#" ? item.href : undefined}
                      sx={{
                        py: 0.5,
                        backgroundColor: isActive(item.href)
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={formatMessage({
                          id: item.name,
                        })}
                        sx={{
                          opacity: isSidebarOpen ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                ))}
              </List>
            </Collapse>

            {/* Master Data Menu */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title={formatMessage({
                  id: "master_data_management",
                })}
                placement="right"
                disableHoverListener={
                  isSidebarOpen || openMenu === "masterData"
                }
                arrow
              >
                <ListItemButton
                  onClick={(e) => toggleMenu("masterData", e)}
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor:
                      (!isSidebarOpen && openMenu === "masterData") ||
                      (!isSidebarOpen && isSubmenuActive(masterDataMenuItems))
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    borderRadius:
                      !isSidebarOpen && openMenu === "masterData" ? 1 : 0,
                  }}
                >
                  <ListItemIcon>
                    <MasterDataIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "master_data_management",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                  {isSidebarOpen &&
                    (openMenu === "masterData" ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            <Collapse
              in={isSidebarOpen && openMenu === "masterData"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {masterDataMenuItems.map((item, index) => (
                  <Tooltip
                    key={index}
                    title={item.name}
                    placement="right"
                    disableHoverListener={isSidebarOpen}
                    arrow
                  >
                    <ListItemButton
                      component={item.href !== "#" ? Link : "div"}
                      href={item.href !== "#" ? item.href : undefined}
                      sx={{
                        py: 0.5,
                        backgroundColor: isActive(item.href)
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={formatMessage({
                          id: item.name,
                        })}
                        sx={{
                          opacity: isSidebarOpen ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                ))}
              </List>
            </Collapse>

            {/* Company Settings Menu */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title={formatMessage({
                  id: "company_settings",
                })}
                placement="right"
                disableHoverListener={
                  isSidebarOpen || openMenu === "companySettings"
                }
                arrow
              >
                <ListItemButton
                  onClick={(e) => toggleMenu("companySettings", e)}
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor:
                      (!isSidebarOpen && openMenu === "companySettings") ||
                      (!isSidebarOpen &&
                        isSubmenuActive(companySettingsMenuItems))
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                    borderRadius:
                      !isSidebarOpen && openMenu === "companySettings" ? 1 : 0,
                  }}
                >
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "company_settings",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                  {isSidebarOpen &&
                    (openMenu === "companySettings" ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            <Collapse
              in={isSidebarOpen && openMenu === "companySettings"}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {companySettingsMenuItems.map((item, index) => (
                  <Tooltip
                    key={index}
                    title={item.name}
                    placement="right"
                    disableHoverListener={isSidebarOpen}
                    arrow
                  >
                    <ListItemButton
                      component={item.href !== "#" ? Link : "div"}
                      href={item.href !== "#" ? item.href : undefined}
                      sx={{
                        py: 0.5,
                        backgroundColor: isActive(item.href)
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        primary={formatMessage({
                          id: item.name,
                        })}
                        sx={{
                          opacity: isSidebarOpen ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                ))}
              </List>
            </Collapse>

            {/* Book Keeping */}
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <Tooltip
                title={formatMessage({
                  id: "book_keeping",
                })}
                placement="right"
                disableHoverListener={isSidebarOpen}
                arrow
              >
                <ListItemButton
                  component={Link}
                  href="#"
                  sx={{
                    minHeight: 44,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: isSidebarOpen ? 1.5 : 0,
                    backgroundColor: isActive("#")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  }}
                >
                  <ListItemIcon>
                    <BookIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatMessage({
                      id: "book_keeping",
                    })}
                    sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          </List>
        </Drawer>

        {/* Popover for submenu items when sidebar is collapsed */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          disableScrollLock={true}
          disableRestoreFocus={true}
          sx={{
            pointerEvents: "auto",
            "& .MuiPopover-paper": {
              marginLeft: 0.5,
            },
          }}
        >
          <Paper
            sx={{
              width: 230,
              backgroundColor: "#0095F0",
              color: "white",
              borderRadius: 1,
            }}
          >
            <List sx={{ py: 0.5 }}>
              {popoverContent.map((item, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton
                    component={item.href !== "#" ? Link : "div"}
                    href={item.href !== "#" ? item.href : undefined}
                    onClick={item.href !== "#" ? handlePopoverClose : undefined}
                    sx={{
                      py: 0.75,
                      px: 2,
                      backgroundColor: isActive(item.href)
                        ? "rgba(255, 255, 255, 0.2)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 32,
                        color: "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={formatMessage({
                        id: item.name,
                      })}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Popover>
      </div>
    </ClickAwayListener>
  );
};

export default Sidebar;
