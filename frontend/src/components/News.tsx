import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { NewsType } from "../redux/slices/newsSlice";
import NewsItem from "./NewsItem";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "./layout/TabPanel";
import PaginatedItems from "./PaginatedSearchResults";
import { Snackbar } from "@mui/material";
import { Alert } from "./Alert";
import { closeNotification } from "../redux/slices/notificationSlice";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function News() {
  const news = useAppSelector((state) => state.news.news);
  const favorites = useAppSelector((state) => state.news.favorites);

  const { messageType, message, open } = useAppSelector(
    (state) => state.notification
  );

  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Headlines" {...a11yProps(0)} />
          <Tab label={`Bookmarks (${favorites.length})`} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PaginatedItems itemsPerPage={10} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {favorites.map((item: NewsType, index: number) => {
          return (
            <Box key={index}>
              <NewsItem item={item} />
            </Box>
          );
        })}
      </TabPanel>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => dispatch(closeNotification())}
      >
        <Alert severity={messageType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
