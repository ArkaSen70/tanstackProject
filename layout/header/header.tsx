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
} from "@mui/material";
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

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(17,24,39,0.9))",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        borderBottom: "2px solid #FACC15",
        paddingY: 2,
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
              }}
            >
              SHOPPING MART
            </Typography>
          </motion.div>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", ml: 4, mr: 4 }}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={(e) => setAnchorElProducts(e.currentTarget)}
                sx={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
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
                  backgroundColor: "rgba(15, 23, 42, 0.7)", // increased transparency
                  color: "white",
                  borderRadius: "16px", // more rounded corners
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

          <Box sx={{ ml: "auto" }}>
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
                  backgroundColor: "rgba(15, 23, 42, 0.7)", // increased transparency
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
                  <MenuItem onClick={handleCloseUserMenu} sx={{ paddingX: 2 }}>
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
                  <MenuItem onClick={handleCloseUserMenu} sx={{ paddingX: 2 }}>
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
                  <MenuItem onClick={handleLogout} sx={{ paddingX: 2 }}>
                    <Typography textAlign="center" sx={{ "&:hover": { color: "#FACC15" } }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu} sx={{ paddingX: 2 }}>
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
                  <MenuItem onClick={handleCloseUserMenu} sx={{ paddingX: 2 }}>
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
    </AppBar>
  );
}

export default ResponsiveAppBar;
