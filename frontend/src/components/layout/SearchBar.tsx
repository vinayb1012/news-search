import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { fetchNews } from "../../redux/slices/newsSlice";
import LanguageSettings from "../LanguageSettings";

const styles = {
  search: {
    width: {
      xs: "100%",
      sm: "80%",
      md: "60%",
    },
    borderRadius: "60px",
  },
};
export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useAppDispatch();
  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = () => {
    if (searchText !== "") {
      dispatch(fetchNews(searchText));
    }
  };
  return (
    <Box>
      <TextField
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        sx={styles.search}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ButtonGroup>
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />

                <LanguageSettings />
              </ButtonGroup>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
