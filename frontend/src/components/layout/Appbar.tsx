import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const styles = {
  appBar: {
    bgcolor: "#050f29",
  },
};
export default function CustomAppBar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box>
      <AppBar position="fixed" sx={styles.appBar}>
        <Toolbar>
          <Typography
            variant={matches ? "h6" : "h4"}
            noWrap
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            HEADLINE HUNTER
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
