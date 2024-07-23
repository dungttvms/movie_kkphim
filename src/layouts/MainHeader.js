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
import { getSearchMovie, getViewerCount } from "../features/movies/movieSlice";
import Logo from "../components/Logo";

function MainHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [searchQuery, setSearchQuery] = useState("");

  const pages = useMemo(
    () => [
      {
        title: "TRANG CHỦ",
        action: () => {
          dispatch(getViewerCount());
          navigate("/");
        },
      },
      { title: "PHIM LẺ", action: () => navigate("/phim-le") },
      { title: "PHIM BỘ", action: () => navigate("/phim-bo") },
      { title: "PHIM HOẠT HÌNH", action: () => navigate("/hoat-hinh") },
      { title: "TV SHOWS", action: () => navigate("/tv-shows") },
    ],
    [navigate, dispatch]
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
    <Container>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Logo sx={{ mr: 2, ml: 2 }} />
            {isMobile ? (
              <>
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
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.title}
                      onClick={page.action}
                      sx={{
                        "&:hover": {
                          backgroundColor: "primary.lighter",
                          borderRadius: "4px",
                          mx: 2,
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
              </>
            ) : (
              pages.map((page) => (
                <Button
                  key={page.title}
                  onClick={page.action}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  {page.title}
                </Button>
              ))
            )}
          </Box>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSubmit={handleSearchSubmit}
            sx={{ ml: 2 }}
          />
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default MainHeader;
