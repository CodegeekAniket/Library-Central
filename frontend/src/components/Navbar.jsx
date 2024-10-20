import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import MobileMenu from "./MobileMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const Navbar = () => {
  const { role, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getButtonStyle = (path) => {
    return currentPath === path
      ? {
          background: "linear-gradient(to right, #FFFFFF,#F5F5DC)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily:"",
          fontWeight: "bold",
          transform: "scale(1.2)",
          transition: "transform 0.2s",
        }
      : {
          color: "#F5F5DC",
        };
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#800000" }}>
      <Toolbar>
        <MenuBookIcon sx={{ marginRight: 1, color: "#F5F5DC" }} />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
           <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              whiteSpace: "nowrap",
              fontFamily: "",
              fontWeight: 1000, // Bold text
              color: "#F5F5DC", // Dark purple text color
              padding: "10px 20px", // Optional: Add padding for a better look
              border: "none", // No border
              background: "transparent", // No background
              cursor: "pointer", // Pointer cursor on hover
              transition: "color 0.3s", // Smooth transition for hover effect
              
            }}
            
            
                        
          >
            Library Management System
          </Typography> 
        </Link>
        {isMatch ? (
          <MobileMenu handleLogout={handleLogout} />
        ) : (
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={getButtonStyle("/")}
              >
                Home
              </Button>
            </Grid>
            {role && (
              <Grid item>
                <Button
                  color="inherit"
                  component={Link}
                  to={role === "librarian" ? "/librarian" : "/user"}
                  sx={getButtonStyle(
                    role === "librarian" ? "/librarian" : "/user"
                  )}
                >
                  Dashboard
                </Button>
              </Grid>
            )}
            {role === "librarian" && (
              <>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/manage-sections"
                    sx={getButtonStyle("/manage-sections")}
                  >
                    Manage Sections
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/manage-ebooks"
                    sx={getButtonStyle("/manage-ebooks")}
                  >
                    Manage E-books
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/manage-requests"
                    sx={getButtonStyle("/manage-requests")}
                  >
                    Manage Requests
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/manage-feedbacks"
                    sx={getButtonStyle("/manage-feedbacks")}
                  >
                    Manage Feedbacks
                  </Button>
                </Grid>
              </>
            )}
            {role === "user" && (
              <>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/available-books"
                    sx={getButtonStyle("/available-books")}
                  >
                    Available Books
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/profile"
                    sx={getButtonStyle("/profile")}
                  >
                    My Profile
                  </Button>
                </Grid>
              </>
            )}
            {role ? (
              <Grid item>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={getButtonStyle("/logout")}
                >
                  Logout
                </Button>
              </Grid>
            ) : (
              <>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/register"
                    sx={getButtonStyle("/register")}
                  >
                    Register
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    sx={getButtonStyle("/login")}
                  >
                    Login
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
