import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  Tooltip,
  Box,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useUserStore } from "@/toolkit/store/store";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const productPages = [
  { name: "Create Product", path: "/cms/create_product" },
  { name: "Product List", path: "/cms/list" },
];

function ResponsiveAppBar() {
  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, setToken, user, setUser, logout } = useUserStore();
  const [cookies, , removeCookie] = useCookies();
  const router = useRouter();
  const [pic, setPic] = useState<any>({});

  // State for mobile drawer
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage) {
      const profile = localStorage.getItem("user");
      if (profile) {
        try {
          const parsedData: any = JSON.parse(profile);
          setPic(parsedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    }
  }, [token]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    logout();
    toast.success("Logout Successfully");
    router.push("/auth/login");
  };

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    if (cookies.token) {
      setToken(cookies.token);
    } else {
      setToken("");
    }
  }, [cookies.token, setToken, setUser]);

  // Handlers for the mobile drawer
  const toggleMobileDrawer = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  const handleProductMenuItemClick = (path: string) => {
    // Close any open menus/drawers and navigate
    setAnchorElProducts(null);
    setMobileDrawerOpen(false);
    router.push(path);
  };

  // Drawer content for mobile view using ListItemButton for clickable items
  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileDrawerOpen(false)}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={toggleMobileDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {productPages.map((page) => (
          <ListItemButton
            key={page.name}
            onClick={() => handleProductMenuItemClick(page.path)}
          >
            <ListItemText primary={page.name} sx={{ color: "#fff" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(17,24,39,0.9))",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #FACC15",
        py: { xs: 1.5, md: 2 },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              component={Link}
              href="/"
              sx={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FACC15",
                textDecoration: "none",
                cursor: "pointer",
                textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              SHOPPING MART
            </Typography>
          </motion.div>

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop view: Products button */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", mx: 4 }}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  onClick={(e) => setAnchorElProducts(e.currentTarget)}
                  sx={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    textTransform: "none",
                  }}
                >
                  Products
                </Button>
              </motion.div>
              <Menu
                anchorEl={anchorElProducts}
                open={Boolean(anchorElProducts)}
                onClose={() => setAnchorElProducts(null)}
                MenuListProps={{ "aria-labelledby": "products-button" }}
                sx={{
                  ".MuiPaper-root": {
                    backgroundColor: "rgba(15, 23, 42, 0.7)",
                    color: "white",
                    borderRadius: "16px",
                    backdropFilter: "blur(8px)",
                    border: "1px solid #FACC15",
                    fontFamily: "'Roboto Mono', monospace",
                  },
                }}
              >
                {productPages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      setAnchorElProducts(null);
                      router.push(page.path);
                    }}
                    sx={{ "&:hover": { color: "#FACC15" } }}
                  >
                    {page.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* Mobile view: Hamburger icon for product pages */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileDrawer}
              sx={{ mx: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Right-side section: Greeting and user settings */}
          <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
            {token && pic?.name && (
              <Typography variant="subtitle1" sx={{ mr: 2, color: "#ffffff", fontSize: { xs: "0.8rem", md: "1rem" } }}>
                Hi {pic.name}
              </Typography>
            )}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Avatar
                    alt="User Avatar"
                    src={pic?.avatar || "/profile.jpeg"}
                    sx={{ width: 45, height: 45, border: "2px solid #FACC15" }}
                  />
                </motion.div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                ".MuiPaper-root": {
                  backgroundColor: "rgba(15, 23, 42, 0.7)",
                  color: "white",
                  borderRadius: "16px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid #FACC15",
                  fontFamily: "'Roboto Mono', monospace",
                },
              }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {token ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ px: 2 }}>
                    <Link href="/auth/profile" passHref>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { color: "#FACC15" },
                        }}
                      >
                        Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ px: 2 }}>
                    <Link href="/auth/update_password" passHref>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { color: "#FACC15" },
                        }}
                      >
                        Update Password
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ px: 2 }}>
                    <Typography textAlign="center" sx={{ "&:hover": { color: "#FACC15" } }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ px: 2 }}>
                    <Link href="/auth/login" passHref>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { color: "#FACC15" },
                        }}
                      >
                        Login
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ px: 2 }}>
                    <Link href="/auth/register" passHref>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          "&:hover": { color: "#FACC15" },
                        }}
                      >
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      {/* Mobile Drawer for product pages with custom transparent background */}
      <Drawer
        anchor="left"
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
            borderRight: "2px solid #FACC15",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </AppBar>
  );
}

export default ResponsiveAppBar;
