import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const timeZones = [
  { city: "Bắc Kinh", zone: "Asia/Shanghai" },
  { city: "Hà Nội", zone: "Asia/Ho_Chi_Minh" },
  { city: "Seoul", zone: "Asia/Seoul" },
  { city: "Tokyo", zone: "Asia/Tokyo" },
  { city: "Moscow", zone: "Europe/Moscow" },
  { city: "New York", zone: "America/New_York" },
  { city: "Dubai", zone: "Asia/Dubai" },
  { city: "California", zone: "America/Los_Angeles" },
  { city: "London", zone: "Europe/London" },
  { city: "Paris", zone: "Europe/Paris" },
];

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [selectedZone, setSelectedZone] = useState("Asia/Ho_Chi_Minh");

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date, timeZone) => {
    const zonedTime = toZonedTime(date, timeZone);
    return format(zonedTime, "HH:mm:ss");
  };

  const handleChange = (event) => {
    setSelectedZone(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      <FormControl variant="outlined" sx={{ mb: 1, minWidth: 120 }}>
        <InputLabel id="timezone-select-label" style={{ color: "white" }}>
          Múi giờ
        </InputLabel>
        <Select
          labelId="timezone-select-label"
          id="timezone-select"
          value={selectedZone}
          onChange={handleChange}
          label="Múi giờ"
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
          }}
        >
          {timeZones.map((tz) => (
            <MenuItem key={tz.zone} value={tz.zone}>
              {tz.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography variant="h6">{formatTime(time, selectedZone)}</Typography>
    </Box>
  );
};

export default DigitalClock;
