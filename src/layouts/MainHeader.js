import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import { getSearchMovie } from "../features/movies/movieSlice";
import CustomChatBot from "../components/ChatBot"; // Import CustomChatBot component

function MainHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [searchQuery, setSearchQuery] = useState("");

  const pages = useMemo(
    () => [
      { title: "TRANG CHỦ", action: () => navigate("/") },
      { title: "PHIM LẺ", action: () => navigate("/phim-le") },
      { title: "PHIM BỘ", action: () => navigate("/phim-bo") },
      { title: "HOẠT HÌNH", action: () => navigate("/hoat-hinh") },
      { title: "TV SHOWS", action: () => navigate("/tv-shows") },
    ],
    [navigate]
  );

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleSearchSubmit = (keyword) => {
    dispatch(getSearchMovie({ keyword }));
    navigate(`/tim-kiem?keyword=${keyword}`);
    setSearchQuery(""); // Reset the search query
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="false">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              {isMobile && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                  ml: 5,
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    pl={1}
                    pr={1}
                    key={page.title}
                    onClick={page.action}
                    sx={{
                      "&:hover": {
                        backgroundColor: "primary.lighter",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      textAlign="center"
                      sx={{ fontSize: "18px" }}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  variant="contained"
                  key={page.title}
                  onClick={page.action}
                  sx={{ my: 2, color: "white" }}
                >
                  {page.title}
                </Button>
              ))}
            </Box>
            <Box>
              <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSubmit={handleSearchSubmit}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <CustomChatBot /> {/* Add the CustomChatBot component */}
    </>
  );
}

export default MainHeader;
