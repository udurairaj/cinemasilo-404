import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getAllMovies, getBookmarkedMovies, getMovieInfo } from "./api";
import PageNotFound from "./reusable/PageNotFound";

import Root from "./Root";
import AllMovies from "./routes/AllMovies";
import Index from "./routes/Index";
import MovieDetails from "./routes/MovieDetails";
import MovieForm from "./routes/CreateMovieForm";
import Movies from "./routes/Movies";
import EditMovieForm from "./routes/EditMovieForm";
import CreateMovieForm from "./routes/CreateMovieForm";

const router = createBrowserRouter([
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          const bookmarks = getBookmarkedMovies();
          return bookmarks;
        },
      },
      {
        path: "/movies",
        element: <Movies />,
        children: [
          {
            path: "/movies",
            element: <AllMovies />,
            loader() {
              return getAllMovies();
            },
          },
          {
            path: "/movies/details/:movieId",
            element: <MovieDetails />,
            loader(route) {
              const movieId = route.params.movieId;
              const info = getMovieInfo(movieId);
              return info;
            },
          },
          {
            path: "/movies/create",
            element: <CreateMovieForm />,
          },
          {
            path: "/movies/edit/:movieId",
            element: <EditMovieForm />,
            loader(route) {
              const movieId = route.params.movieId;
              return getMovieInfo(movieId);
            },
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
