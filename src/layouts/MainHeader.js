import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
  Button,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";
import {
  getCountries,
  getGenres,
  getSearchMovie,
  getViewerCount,
} from "../features/movies/movieSlice";
import Logo from "../components/Logo";

function MainHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery("(max-width: 900px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorElCountries, setAnchorElCountries] = useState(null);
  const [anchorElGenres, setAnchorElGenres] = useState(null);
  const countries = useSelector((state) => state.movie.countries);
  const genres = useSelector((state) => state.movie.genres);
  const [anchorElNav, setAnchorElNav] = useState(null);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getGenres());
  }, [dispatch]);

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setAnchorElNav(null);
  }, []);

  const handleOpenMenu = useCallback((event, menuType) => {
    if (menuType === "countries") {
      setAnchorElCountries(event.currentTarget);
    } else if (menuType === "genres") {
      setAnchorElGenres(event.currentTarget);
    }
  }, []);

  const handleCloseCountriesMenu = useCallback(() => {
    setAnchorElCountries(null);
  }, []);

  const handleCloseGenresMenu = useCallback(() => {
    setAnchorElGenres(null);
  }, []);

  const handleCountrySelect = useCallback(
    (slug, name) => {
      navigate(`/quoc-gia/${slug}`, { state: { countryName: name } });

      handleCloseCountriesMenu();
    },
    [navigate, handleCloseCountriesMenu]
  );

  const handleGenreSelect = useCallback(
    (slug, name) => {
      navigate(`/the-loai/${slug}`, { state: { genreName: name } });
      handleCloseGenresMenu();
    },
    [navigate, handleCloseGenresMenu]
  );

  const pages = useMemo(
    () => [
      {
        title: "TRANG CHỦ",
        action: () => {
          dispatch(getViewerCount());
          navigate("/");
          handleCloseNavMenu();
        },
      },
      {
        title: "PHIM LẺ",
        action: () => {
          dispatch(getViewerCount());
          navigate("/phim-le");
          handleCloseNavMenu();
        },
      },
      {
        title: "PHIM BỘ",
        action: () => {
          dispatch(getViewerCount());
          navigate("/phim-bo");
          handleCloseNavMenu();
        },
      },
      {
        title: "PHIM HOẠT HÌNH",
        action: () => {
          dispatch(getViewerCount());
          navigate("/hoat-hinh");
          handleCloseNavMenu();
        },
      },
      {
        title: "TV SHOWS",
        action: () => {
          dispatch(getViewerCount());
          navigate("/tv-shows");
          handleCloseNavMenu();
        },
      },
      {
        title: "THỂ LOẠI",
        action: (e) => {
          dispatch(getViewerCount());
          handleOpenMenu(e, "genres");
          handleCloseNavMenu();
        },
      },
      {
        title: "QUỐC GIA",
        action: (e) => {
          dispatch(getViewerCount());
          handleOpenMenu(e, "countries");
          handleCloseNavMenu();
        },
      },
    ],
    [handleOpenMenu, handleCloseNavMenu, navigate, dispatch]
  );

  const handleSearchSubmit = useCallback(
    (keyword, page = 1) => {
      dispatch(getSearchMovie({ keyword, page: 1 }));
      navigate(`/tim-kiem?keyword=${keyword}`);
      setSearchQuery("");
    },
    [dispatch, navigate]
  );

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
                  aria-label="menu"
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
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
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
      <Menu
        id="menu-countries"
        anchorEl={anchorElCountries}
        open={Boolean(anchorElCountries)}
        onClose={handleCloseCountriesMenu}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          style: {
            padding: "10px",
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {countries.map((country) => (
            <Grid
              item
              xs={6}
              sm={4}
              key={country.slug}
              style={{ textAlign: "center" }}
            >
              <MenuItem
                onClick={() => handleCountrySelect(country.slug, country.name)}
              >
                {country.name}
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Menu>

      <Menu
        id="menu-genres"
        anchorEl={anchorElGenres}
        open={Boolean(anchorElGenres)}
        onClose={handleCloseGenresMenu}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          style: {
            padding: "10px",
            width: "500px",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {genres.map((genre) => (
            <Grid
              item
              xs={6}
              sm={4}
              key={genre.slug}
              style={{ textAlign: "center" }}
            >
              <MenuItem
                onClick={() => handleGenreSelect(genre.slug, genre.name)}
              >
                {genre.name}
              </MenuItem>
            </Grid>
          ))}
        </Grid>
      </Menu>
    </Container>
  );
}

export default MainHeader;
