import React from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ searchQuery, setSearchQuery, handleSubmit }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Tìm phim..."
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: "90%",
          marginRight: "16px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // default border color
            },
            "&:hover fieldset": {
              borderColor: "yellow", // border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "red", // border color when focused
            },
          },
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                color="primary"
                aria-label="Tìm phim..."
              >
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
