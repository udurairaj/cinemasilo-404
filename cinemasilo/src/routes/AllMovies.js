import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBookmark, deleteBookmark } from "../api";
import Bookmarkable from "../reusable/Bookmark";
import Popup from "../reusable/Popup";

export default function AllMovies() {
  const allMovies = useLoaderData();
  const [movies, setMovies] = useState(allMovies);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [clickedBookmarkId, setClickedBookmarkId] = useState("null");
  const [clickedMovieId, setClickedMovieId] = useState("null");
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "All Movies";
  }, []);

  useEffect(() => {
    if (genre !== "") {
      const capsGenre = genre.charAt(0).toUpperCase() + genre.substring(1);
      document.title = `${capsGenre} Movies`;
    } else {
      document.title = `All Movies`;
    }
  }, [genre]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector(".needs-validation");
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (name !== "") {
      return createBookmark(
        clickedMovieId,
        name,
        new Date().toLocaleString()
      ).then(() => {
        toast.success("Bookmark created!");
        setPopupOpen(false);
        return navigate(`/movies`);
      });
    }
  }

  function handleFilter(event) {
    event.preventDefault();
    const form = document.querySelector(".needs-validation");
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (genre !== "") {
      const filteredMovies = movies.filter((movie) => {
        return movie.genre.toLowerCase().includes(genre.toLowerCase());
      });
      setMovies(filteredMovies);
      toast.success(`Movies filtered by ${genre}.`);
    }
  }

  function handleReset(event) {
    event.preventDefault();
    setMovies(allMovies);
    setGenre("");
    toast.success(`Displaying all movies...`);
    return navigate(`/movies`);
  }

  function onClick(event) {
    setClickedBookmarkId(event.currentTarget.id);
    setClickedMovieId(event.currentTarget.value);

    setPopupOpen(true);
  }

  useEffect(() => {
    setMovies(allMovies);
    let newGenres = [];
    movies.forEach((movie) => {
      let movieGenres = movie.genre.toLowerCase().split(",");
      movieGenres.forEach((movieGenre) => {
        movieGenre.trim();
      });
      newGenres = [...new Set([...newGenres, ...movieGenres])];
    });
    setGenres(newGenres);
  }, [allMovies]);

  useEffect(() => {
    const refresh = () => navigate("/movies");
    if (
      deleteConfirmation &&
      clickedBookmarkId !== "null" &&
      clickedMovieId !== "null"
    ) {
      deleteBookmark(clickedMovieId, clickedBookmarkId).then((status) => {
        if (status === 200 || status === 204) {
          toast.success("Bookmark deleted.");
        } else {
          toast.error("Bookmark could not be deleted. Try again later.");
        }
        refresh();
      });
    }
  }, [deleteConfirmation, clickedBookmarkId, clickedMovieId, navigate]);

  return (
    <div className="container">
      <h2 className="subheader-title">View All Movies</h2>
      <div className="row">
        <div className="col-12">
          <form className="needs-validation" onSubmit={handleFilter} noValidate>
            <div className="row">
              <label htmlFor="genre" className="form-label">
                Filter by genre:{" "}
              </label>
              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="genre"
                  name="genre"
                  value={genre}
                  list="suggestions"
                  onChange={(event) => {
                    setGenre(event.target.value);
                  }}
                  required
                />
                <datalist id="suggestions">
                  {genres.map((genre) => {
                    return <option key={genre} value={genre} />;
                  })}
                </datalist>
                <div className="invalid-feedback">
                  Please enter a genre to filter results.
                </div>
              </div>
              <div className="col-md-8 mb-3">
                <button
                  type="reset"
                  onClick={handleReset}
                  className="btn btn-secondary cancel-btn"
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-info confirm-btn ms-2">
                  Filter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        {movies.map((movie) => {
          const bookmark = movie.bookmark;
          return (
            <div key={movie.id} className="col-xl-4 col-lg-6 col-sm-12">
              <Bookmarkable
                movieId={movie.id}
                title={movie.title}
                genre={movie.genre}
                userAdded={`Added by: ${movie.user}`}
                bookmarkUser={
                  movie.bookmarkId !== "null"
                    ? `Bookmarked by: ${bookmark.user}`
                    : "null"
                }
                bookmarkDatetime={
                  movie.bookmarkId !== "null"
                    ? `at ${bookmark.datetime}`
                    : "null"
                }
                notes={movie.notes}
                type="bookmarks-page"
              >
                {() => {
                  return (
                    <button
                      type="button"
                      className="bookmark-btn btn btn-link"
                      onClick={onClick}
                      id={bookmark.id}
                      value={movie.id}
                    >
                      <FontAwesomeIcon
                        icon={faBookmark}
                        color={
                          movie.bookmarkId !== "null" ? "#5668a6" : "#dddddd"
                        }
                        size="3x"
                        className={
                          movie.bookmarkId !== "null"
                            ? ""
                            : "icon-not-bookmarked"
                        }
                      />
                    </button>
                  );
                }}
              </Bookmarkable>
            </div>
          );
        })}
      </div>
      {popupOpen &&
        clickedBookmarkId !== "null" &&
        clickedMovieId !== "null" && (
          <Popup
            title="Delete Bookmark?"
            goButton="Delete"
            onConfirm={() => {
              setDeleteConfirmation(true);
              setPopupOpen(false);
            }}
            onCancel={() => {
              setPopupOpen(false);
            }}
          >
            <p>Are you sure you want to remove this bookmark?</p>
          </Popup>
        )}
      {popupOpen && clickedBookmarkId === "null" && (
        <Popup
          title="Add Bookmark?"
          goButton="null"
          onConfirm={() => {
            setPopupOpen(false);
          }}
          onCancel={() => {
            setPopupOpen(false);
          }}
        >
          <p>You are adding a bookmark.</p>
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="col-md-3 mb-3">
              <label htmlFor="name" className="form-label">
                Enter your name:{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">Please enter your name.</div>
            </div>
            <button type="submit" className="btn btn-info confirm-btn">
              Add Bookmark
            </button>
          </form>
        </Popup>
      )}
    </div>
  );
}
