import { Album } from "@/models/albums/typing";
import { Box, Grid, IconButton } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface InfosAlbumProps {
  album: Album;
}

const InfosAlbum = ({ album }: InfosAlbumProps) => {
  const handleClickPlay = () => {
    console.log("play");
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
        <Grid item xs={12} mb={1}>
          {album.artists[0].name}
        </Grid>
        <Grid item xs={12} mb={1}>
          {album.tracks.items.map((track) => (
            <Box key={track.id} display="flex" alignItems="center">
              <IconButton size="small" onClick={handleClickPlay}>
                <PlayCircleIcon color="primary" />
              </IconButton>
              <div key={track.id}>{track.name}</div>
            </Box>
          ))}
        </Grid>
        <div>{album.label}</div>
        <div>{album.album_type}</div>
        {album.genres.map((genre) => (
          <div key={genre}>{genre}</div>
        ))}
      </Grid>
    </Box>
  );
};

export default InfosAlbum;
