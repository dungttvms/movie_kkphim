import React from "react";
import { IconButton, Box } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function Pagination({ page, setPage }) {
  const handleBack = () => {
    setPage(page - 2);
  };

  const handleForward = () => {
    setPage(page + 2);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <IconButton onClick={handleBack} disabled={page === 1}>
        <ArrowBack />
      </IconButton>
      <IconButton onClick={handleForward}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
}

export default Pagination;
