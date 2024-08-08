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
        placeholder="Nhập tên phim cần tìm..."
        onChange={(event) => setSearchQuery(event.target.value)}
        sx={{
          width: "90%",
          marginRight: "16px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // default border color
            },
            "&:hover fieldset": {
              borderColor: "red", // border color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "green", // border color when focused
            },
          },
          "& .MuiInputBase-input": {
            color: "white", // input text color
          },
        }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="Nhập tên phim cần tìm...">
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
