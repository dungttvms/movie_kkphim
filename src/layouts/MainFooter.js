import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

const ICON_LINK = [
  {
    name: "twitter",
    icon: (
      <Link
        href="https://facebook.com/dungttvms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <XIcon sx={{ color: "#000000", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "facebook",
    icon: (
      <Link
        href="https://facebook.com/dungttvms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon
          sx={{ color: "#1877F2", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
  {
    name: "youtube",
    icon: (
      <Link
        href="https://facebook.com/dungttvms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YouTubeIcon sx={{ color: "#FF0000", width: "40px", height: "40px" }} />
      </Link>
    ),
  },
  {
    name: "instagram",
    icon: (
      <Link
        href="https://facebook.com/dungttvms"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon
          sx={{ color: "#E4405F", width: "40px", height: "40px" }}
        />
      </Link>
    ),
  },
];

function MainFooter() {
  return (
    <Container maxWidth="lg" sx={{ pt: 3 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Stack mt={1} spacing={3} direction="row" name="link">
                {ICON_LINK.map((value) => (
                  <Tooltip
                    sx={{
                      "&:hover": {
                        opacity: [0.9, 0.8, 0.7],
                        cursor: "pointer",
                      },
                    }}
                    key={value.name}
                    title={value.name}
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    {value.icon}
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ my: 1 }}
      >
        {`Copyright © `}
        <Link color="inherit" href="https://facebook.com/dungttvms">
          Web phim miễn phí
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ my: 1 }}
      >
        Website dùng với mục đích học tập
      </Typography>
    </Container>
  );
}

export default MainFooter;
