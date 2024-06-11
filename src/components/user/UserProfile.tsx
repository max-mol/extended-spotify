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
    <Grid container>
      <Image
        alt="your face"
        loader={imageLoader}
        src={`${user.images[1].url}`}
        height={user.images[1].height}
        width={user.images[1].width}
        style={{ borderRadius: "50%" }}
      />
    </Grid>
  );
};

export default UserProfile;
