import React, { useState, useCallback, useMemo } from "react";
import { TextField, Grid, Box } from "@mui/material";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import apiService from "../app/apiService";

const FormCollectionEmail = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await apiService.post("/emails", { email });
        toast.success("Cảm ơn bạn ");
        setEmail("");
      } catch (error) {
        toast.error(error.message);
      }
    },
    [email]
  );

  const sendIconStyles = useMemo(
    () => ({
      cursor: "pointer",
      transition: "color 0.3s ease",
      "&:hover": {
        color: "red",
      },
    }),
    []
  );

  return (
    <Box width="100%">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              variant="outlined"
              label="Đăng ký nhận tin"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <SendIcon
              sx={sendIconStyles}
              color="primary"
              onClick={handleSubmit}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormCollectionEmail;
