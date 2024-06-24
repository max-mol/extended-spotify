import Switch from "@/components/ui/Switch";
import { Box } from "@mui/material";

export default function Ranks() {
  return (
    <Box>
      Ranks
      <Switch
        options={[
          { label: "Artists", value: "artists" },
          { label: "Tracks", value: "tracks" },
        ]}
        value={"artists"}
      />
    </Box>
  );
}
