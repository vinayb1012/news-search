import { ButtonGroup, IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

type SocialMediaProps = {
  text: string;
  url: string;
};
export default function SocialMediaShare({ text, url }: SocialMediaProps) {
  const [show, setShow] = useState(false);

  const shareWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, "_blank");
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?text=${text}&url=${url}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${text} ${url}`,
      "_blank"
    );
  };

  return (
    <>
      <IconButton onClick={() => setShow(!show)}>
        <ShareIcon />
      </IconButton>
      {show && (
        <ButtonGroup>
          <IconButton onClick={shareWhatsapp}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton onClick={shareTelegram}>
            <TelegramIcon />
          </IconButton>
          <IconButton onClick={shareTwitter}>
            <TwitterIcon />
          </IconButton>
        </ButtonGroup>
      )}
    </>
  );
}
