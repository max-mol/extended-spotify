import { purple } from "@/libs/theme/light";
import { User } from "@/models/user/typing";
import { imageLoader } from "@/utils/imageLoader";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Grid container>
      <Grid item xs={6} display="flex" justifyContent="center">
        <Image
          alt="your face"
          loader={() => imageLoader(user.images[1].url, user.images[1].width)}
          src={`${user.images[1].url}`}
          height={user.images[1].height}
          width={user.images[1].width}
          style={{ borderRadius: "50%" }}
        />
      </Grid>
      <Grid item xs={6} display="flex" alignItems="center">
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            sx={{ color: purple.main, fontWeight: 700 }}
          >
            Name
          </Grid>
          <Grid item xs={6}>
            {user.display_name}
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            sx={{ color: purple.main, fontWeight: 700 }}
          >
            Mail
          </Grid>
          <Grid item xs={6}>
            {user.email}
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="flex-end"
            sx={{ color: purple.main, fontWeight: 700 }}
          >
            N° of followers
          </Grid>
          <Grid item xs={6}>
            {user.followers.total}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
