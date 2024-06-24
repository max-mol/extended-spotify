import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Image from "next/image";
import { Track } from "@/models/tracks/typing";
import { imageLoader } from "@/utils/imageLoader";
import {
  pausePlayback,
  resumePlayback,
  setPlaybackVolume,
  setRepeatState,
  skipToNext,
  skipToPrevious,
} from "@/services/PlayerService";

import useCurrentlyPlayingTrackData from "@/app/useCurrentlyPlayingTrackData";
import RefreshIcon from "@mui/icons-material/Refresh";
import { RepeatStates } from "@/models/player/typing";
import { useState } from "react";
import ReplayCircleFilledIcon from "@mui/icons-material/ReplayCircleFilled";
import ReplayIcon from "@mui/icons-material/Replay";
import _throttle from "lodash/throttle";
import { useSnackbar } from "./SnackbarProvider";
import "./MusicPlayerSlider.css";

// const WallPaper = styled("div")({
//   position: "absolute",
//   width: "100%",
//   height: "100%",
//   top: 0,
//   left: 0,
//   overflow: "hidden",
//   background: "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
//   transition: "all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s",
//   "&::before": {
//     content: '""',
//     width: "140%",
//     height: "140%",
//     position: "absolute",
//     top: "-40%",
//     right: "-50%",
//     background:
//       "radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)",
//   },
//   "&::after": {
//     content: '""',
//     width: "140%",
//     height: "140%",
//     position: "absolute",
//     bottom: "-50%",
//     left: "-30%",
//     background:
//       "radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)",
//     transform: "rotate(30deg)",
//   },
// });

const Widget = styled("div")(({ theme }) => ({
  // padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 50,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

// const TinyText = styled(Typography)({
//   fontSize: "0.75rem",
//   opacity: 0.38,
//   fontWeight: 500,
//   letterSpacing: 0.2,
// });

interface MusicPlayerSliderProps {}

export default function MusicPlayerSlider({}: MusicPlayerSliderProps) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  // const duration = 200; // seconds
  // const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = useState(false);
  // function formatDuration(value: number) {
  //   const minute = Math.floor(value / 60);
  //   const secondLeft = value - minute * 60;
  //   return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  // }
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const token = localStorage.getItem("access_token") as string;

  const [localRepeatState, setLocalRepeatState] =
    useState<RepeatStates>("context");

  const { item, updateTrack } = useCurrentlyPlayingTrackData();

  const handlePausePlayback = async () => {
    await pausePlayback({ token });
    await updateTrack();
  };
  const handleResumePlayback = async () => {
    await resumePlayback({ token });
    await updateTrack();
  };
  const handleSkipToNext = async () => {
    await skipToNext({ token });
    setTimeout(async () => {
      await updateTrack();
    }, 500);
  };
  const handleSkipToPrevious = async () => {
    await skipToPrevious({ token });
    setTimeout(async () => {
      await updateTrack();
    }, 500);
  };
  const handleSetVolume = _throttle(async (volume: number) => {
    try {
      await setPlaybackVolume({ token, volume });
      await updateTrack();
    } catch (e) {
      enqueueSnackbar("error", "Volume can't be adjusted from here");
    }
  }, 1000);
  const handleSetRepeatMode = async () => {
    let newRepeatState: RepeatStates = "off";
    if (localRepeatState === "off") {
      newRepeatState = "track";
    }
    if (localRepeatState === "track") {
      newRepeatState = "context";
    }
    if (localRepeatState === "context") {
      newRepeatState = "off";
    }
    try {
      await setRepeatState({ token, repeatState: newRepeatState });
      setLocalRepeatState(newRepeatState);
    } catch (e) {}
    setTimeout(async () => {
      await updateTrack();
    }, 500);
  };

  if (!item) return;

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage className="rotate">
            <Image
              alt={`${item.album.name} album cover`}
              src={item.album.images[0].url}
              width={100}
              height={100}
              loader={() => imageLoader(item.album.images[0].url, 100)}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {item.album.artists[0].name}
            </Typography>
            <Typography noWrap>
              <b>{item.album.name}</b>
            </Typography>
            <Typography
              noWrap
              letterSpacing={-0.25}
              display="flex"
              alignItems="center"
            >
              {item.name}
              <IconButton onClick={updateTrack}>
                <RefreshIcon sx={{ fontSize: "22px" }} />
              </IconButton>
            </Typography>
          </Box>
        </Box>
        {/* <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value as number)}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&::before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={handleSkipToPrevious}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => {
              setPaused(!paused);
              if (paused) {
                handleResumePlayback();
              } else {
                handlePausePlayback();
              }
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleSkipToNext}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton onClick={handleSetRepeatMode}>
            {localRepeatState === "off" && (
              <ReplayIcon fontSize="medium" htmlColor={mainIconColor} />
            )}
            {localRepeatState === "track" && (
              <ReplayIcon fontSize="medium" color="primary" />
            )}
            {localRepeatState === "context" && (
              <ReplayCircleFilledIcon fontSize="medium" color="primary" />
            )}
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            onChange={(_, value) => handleSetVolume(value as number)}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&::before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
}
