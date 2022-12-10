import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBookmark, deleteBookmark } from "../api";
import Bookmarkable from "../reusable/Bookmark";
import Popup from "../reusable/Popup";
import "../styles/MovieDetails.css";

export default function MovieDetails() {
  const movie = useLoaderData();
  const { movieId } = useParams();
  const bookmark = movie.bookmark;
  const bookmarkId = movie.bookmarkId;

  const [clickedBookmarkId, setClickedBookmarkId] = useState("null");
  const [clickedMovieId, setClickedMovieId] = useState("null");
  const [popupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${movie.title}`;
  }, [movie]);

  function onClick(event) {
    setClickedBookmarkId(event.currentTarget.id);
    setClickedMovieId(event.currentTarget.value);
    setPopupOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector(".needs-validation");
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (name !== "") {
      return createBookmark(movieId, name, new Date().toLocaleString()).then(
        () => {
          toast.success("Bookmark created!");
          return navigate(`/movies/details/${movieId}`);
        }
      );
    }
  }

  useEffect(() => {
    const refresh = () => navigate(`/movies/details/${clickedMovieId}`);
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
      <h2 className="subheader-title">Movie Details</h2>
      <Bookmarkable
        movieId={movieId}
        title={movie.title}
        details={movie.details}
        genre={movie.genre}
        userAdded={`Added by: ${movie.user}`}
        bookmarkUser={
          bookmarkId !== "null" ? `Bookmarked by: ${bookmark.user}` : "null"
        }
        bookmarkDatetime={
          bookmarkId !== "null" ? `at ${bookmark.datetime}` : "null"
        }
        notes={movie.notes}
        position="movie-details-page"
      >
        {() => {
          return (
            <button
              type="button"
              className="bookmark-btn btn btn-link"
              onClick={onClick}
              id={bookmarkId}
              value={movie.id}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                color={bookmarkId !== "null" ? "#5668a6" : "#dddddd"}
                size="3x"
                className={bookmarkId !== "null" ? "" : "icon-not-bookmarked"}
              />
            </button>
          );
        }}
      </Bookmarkable>
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
      {popupOpen && bookmarkId === "null" && (
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
            <button type="submit" className="btn btn-primary btn-custom">
              Add Bookmark
            </button>
          </form>
        </Popup>
      )}
    </div>
  );
}
