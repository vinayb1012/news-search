import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export type NewsType = {
  source: {
    id: string;
    name: string;
  };
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  metadata: {
    id: string;
    isFavorite: boolean | undefined;
  };
};

type InitialState = {
  news: NewsType[];
  favorites: NewsType[];
  currentPage: number;
  language: string;
};

const initialState: InitialState = {
  news: [],
  favorites: [],
  currentPage: 0,
  language: "en",
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (query: string, { getState, rejectWithValue }) => {
    const state = getState() as any;

    return axios
      .get(
        `http://localhost:5000/api/news?query=${query}&language=${state.news.language}`
      )
      .then((response) => {
        return response.data;
      })

      .catch((error) => rejectWithValue(error.response.data));
  }
);
export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addFavorite: (state = initialState, action) => {
      state.news = state.news.map((article) => {
        if (article.metadata.id === action.payload.id) {
          article.metadata.isFavorite = true;
          state.favorites.push(article);
        }
        return article;
      });
    },
    removeFavorite: (state = initialState, action) => {
      state.news = state.news.map((article) => {
        if (article.metadata.id === action.payload.id) {
          article.metadata.isFavorite = false;
        }
        return article;
      });
      state.favorites = state.favorites.filter(
        (favorite) => favorite.metadata.id !== action.payload.id
      );
    },

    changePage: (state = initialState, action) => {
      state.currentPage = action.payload;
    },

    changeLanguage: (state = initialState, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.currentPage = 0;
      state.news.forEach((news) => {
        // Remove html tags from description
        news.description = news.description?.replace(/(<([^>]+)>)/gi, "");
        news.metadata = {
          id: uuidv4(),
          isFavorite: false,
        };
      });
    });
  },
});

export const newsReducer = newsSlice.reducer;
export const { addFavorite, removeFavorite, changePage, changeLanguage } =
  newsSlice.actions;
