import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function CustomAppBar() {
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#050f29" }}>
        <Toolbar>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{
              display: { alignContent: "center" },
            }}
          >
            HEADLINE HUNTER
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
