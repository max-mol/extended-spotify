import { purple } from "@/libs/theme/light";
import { User } from "@/models/user/typing";
import { Box, Grid } from "@mui/material";
import Image from "next/image";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  console.log(user);
  const imageLoader = () => {
    return `${user.images[1].url}?w=${user.images[1].width}&q=75`;
  };

  return (
    <Grid container m={5}>
      <Grid item xs={6} display="flex" justifyContent="center">
        <Image
          alt="your face"
          loader={imageLoader}
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
            sx={{ color: purple.main }}
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
            sx={{ color: purple.main }}
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
            sx={{ color: purple.main }}
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
