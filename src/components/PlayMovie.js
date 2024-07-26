import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Box, IconButton, Slider, Stack } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  FastForward,
  FastRewind,
} from "@mui/icons-material";

const PlayMovie = ({ url }) => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handlePlayPause = () => setPlaying(!playing);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue / 100);
    setMuted(newValue === 0);
  };

  const handleMute = () => setMuted(!muted);

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekChange = (event, newValue) => {
    setSeeking(true);
    setPlayed(newValue / 100);
  };

  const handleSeekMouseUp = (event, newValue) => {
    setSeeking(false);
    playerRef.current.seekTo(newValue / 100, "fraction");
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() + 10,
      "seconds"
    );
  };

  const handleRewind = () => {
    playerRef.current.seekTo(
      playerRef.current.getCurrentTime() - 10,
      "seconds"
    );
  };

  const handleFullscreen = () => {
    if (!fullscreen) {
      playerRef.current.getInternalPlayer().requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <Box>
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        width="1080px"
        height="768px"
        controls={false}
      />
      <Stack direction="row" spacing={2} alignItems="center" mt={2}>
        <IconButton onClick={handlePlayPause}>
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton onClick={handleRewind}>
          <FastRewind />
        </IconButton>
        <IconButton onClick={handleFastForward}>
          <FastForward />
        </IconButton>
        <IconButton onClick={handleMute}>
          {muted ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Slider
          value={volume * 100}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          sx={{ width: 100 }}
        />
        <Slider
          value={played * 100}
          onChange={handleSeekChange}
          onChangeCommitted={handleSeekMouseUp}
          aria-labelledby="progress-slider"
          sx={{ flex: 1 }}
        />
        <IconButton onClick={handleFullscreen}>
          {fullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default PlayMovie;
