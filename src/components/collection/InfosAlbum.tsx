import { Album } from "@/models/albums/typing";
import { Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { SimplifiedTrack } from "@/models/tracks/typing";
import { playTrack } from "@/services/PlayerService";

interface InfosAlbumProps {
  album: Album;
}

const InfosAlbum = ({ album }: InfosAlbumProps) => {
  const token = localStorage.getItem("access_token") as string;

  const handleClickPlay = async (album: Album, track: SimplifiedTrack) => {
    await playTrack({
      contextUri: album.uri,
      token: token,
      trackContextPosition: track.track_number,
    });
  };

  return (
    <Box m={1}>
      <Grid
        fontSize={12}
        container
        display="flex"
        justifyContent="space-between"
      >
        <Box sx={{ fontWeight: 600, fontSize: 14 }}>{album.name}</Box>
        <div>{album.release_date.slice(0, 4)}</div>
        <Grid size={{ xs: 12 }} mb={1}>
          {album.artists[0].name}
        </Grid>
        <Grid size={{ xs: 12 }} mb={1}>
          {album.tracks.items.map((track) => (
            <Box key={track.id} display="flex" alignItems="center">
              <IconButton
                size="small"
                onClick={() => handleClickPlay(album, track)}
              >
                <PlayCircleIcon color="primary" />
              </IconButton>
              <div key={track.id}>{track.name}</div>
            </Box>
          ))}
        </Grid>
        <Grid size={12}>
          <div>{album.label}</div>
        </Grid>
        <Grid size={12}>
          <div>{album.album_type}</div>
        </Grid>
        <Box mt={1}>
          {album.genres.map((genre) => (
            <div key={genre}>{genre}</div>
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default InfosAlbum;
