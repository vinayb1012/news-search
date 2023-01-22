import { Box, IconButton, Menu } from "@mui/material";
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Check from "@mui/icons-material/Check";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { changeLanguage } from "../redux/slices/newsSlice";
import { showNotification } from "../redux/slices/notificationSlice";

const languages = [
  {
    name: "English",
    code: "en",
  },

  {
    name: "French",
    code: "fr",
  },
  {
    name: "German",
    code: "de",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "Italian",
    code: "it",
  },
];
export default function LanguageSettings() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const currentLanguage = useAppSelector((state) => state.news.language);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    dispatch(changeLanguage(language));
    dispatch(
      showNotification({
        messageType: "success",
        message: `Language changed to ${language}`,
        open: true,
      })
    );
    handleClose();
  };
  return (
    <Box>
      <IconButton onClick={handleClick}>
        <LanguageTwoToneIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          {languages.map((language, id) => (
            <MenuItem
              key={id}
              onClick={() => handleLanguageChange(language.code)}
            >
              <ListItemIcon>
                {currentLanguage === language.code ? <Check /> : null}
              </ListItemIcon>
              <ListItemText primary={language.name} />
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}
