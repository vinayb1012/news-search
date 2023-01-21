import React, { ChangeEvent, useState } from "react";
import { Pagination } from "@mui/material";
import { changePage, NewsType } from "../redux/slices/newsSlice";
import Box from "@mui/material/Box";
import NewsItem from "./NewsItem";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function Items({ currentItems }: any) {
  return (
    <>
      {currentItems &&
        currentItems.map((item: NewsType, index: number) => {
          return (
            <Box key={index}>
              <NewsItem item={item} />
            </Box>
          );
        })}
    </>
  );
}

type PaginatedItemsProps = {
  itemsPerPage: number;
};
export default function PaginatedItems({ itemsPerPage }: PaginatedItemsProps) {
  const news = useAppSelector((state) => state.news.news);
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => state.news.currentPage);
  const [itemOffset, setItemOffset] = useState(currentPage * itemsPerPage);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = news.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(changePage(value - 1));
    const newOffset = ((value - 1) * itemsPerPage) % news.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Items currentItems={currentItems} />

      {currentItems.length > 0 && (
        <Pagination
          count={pageCount}
          page={currentPage + 1}
          onChange={handlePageChange}
        />
      )}
    </>
  );
}
