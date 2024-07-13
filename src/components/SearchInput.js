import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ handleSubmit, resetSearchQuery }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchQuery);
    resetSearchQuery();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        value={searchQuery}
        placeholder="Tìm phim..."
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: 300,
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
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default SearchInput;
