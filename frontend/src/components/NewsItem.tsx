import {
  addFavorite,
  NewsType,
  removeFavorite,
} from "../redux/slices/newsSlice";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  IconButtonProps,
  Link,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAppDispatch } from "../redux/hooks";
import SocialMediaShare from "./SocialMediaShare";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
type NewsItemProps = {
  item: NewsType;
};

const styles = {
  card: { width: "50%", height: "20%", margin: "20px", padding: "30px" },

  media: {
    height: "20%",
    width: "20%",
  },
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewsItem({ item }: NewsItemProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFavorite = () => {
    if (item.metadata.isFavorite === false)
      dispatch(addFavorite({ id: item.metadata.id }));
    else dispatch(removeFavorite({ id: item.metadata.id }));
  };

  return (
    <Card sx={styles.card}>
      <Link href={item.url} target={"_blank"}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={item.title}
          subheader={`${item.source.name} - ${new Date(
            item.publishedAt
          ).toLocaleDateString()}`}
        />
      </Link>

      {item.urlToImage && (
        <CardMedia
          component="img"
          image={item.urlToImage}
          alt={item.title}
          sx={styles.media}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleFavorite} aria-label="add to favorites">
          {item.metadata?.isFavorite ? (
            <BookmarkIcon />
          ) : (
            <BookmarkBorderIcon />
          )}
        </IconButton>

        <SocialMediaShare text={item.title} url={item.url} />

        <IconButton onClick={() => setModalOpen(true)}>
          <VisibilityIcon />
        </IconButton>
      </CardActions>

      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe src={item.url} width="100%" height="100%" title={item.url} />
        </Box>
      </Modal>
    </Card>
  );
}
