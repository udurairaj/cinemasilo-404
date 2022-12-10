import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createMoviePost, updateMoviePost } from "../api";

export default function EditMovieForm() {
  const movieInfo = useLoaderData();
  const [title, setTitle] = useState(movieInfo.title);
  const [genre, setGenre] = useState(movieInfo.genre);
  const [details, setDetails] = useState(movieInfo.details);
  const [notes, setNotes] = useState(movieInfo.notes);
  const [user, setUser] = useState(movieInfo.user);
  const [bookmark, setBookmark] = useState(movieInfo.bookmarkId !== "null");
  const [bookmarkId, setBookmarkId] = useState(movieInfo.bookmarkId);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Edit ${movieInfo.title}`;
  }, [movieInfo]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector(".needs-validation");
    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    form.classList.add("was-validated");
    if (
      title !== "" &&
      genre !== "" &&
      details !== "" &&
      notes !== "" &&
      user !== ""
    ) {
      let newBookmark = "";
      let oldBookmark = "";
      if (bookmark && bookmarkId !== "null") {
        newBookmark = bookmarkId;
        oldBookmark = bookmarkId;
      } else if (!bookmark && bookmarkId !== "null") {
        newBookmark = "null";
        oldBookmark = bookmarkId;
      } else if (bookmark && bookmarkId === "null") {
        newBookmark = "-1";
        oldBookmark = "null";
      } else if (!bookmark && bookmarkId === "null") {
        newBookmark = "null";
        oldBookmark = "null";
      }
      return updateMoviePost(
        movieInfo.id,
        title,
        genre,
        details,
        notes,
        user,
        newBookmark,
        oldBookmark
      ).then((data) => {
        toast.success("Movie edited!");
        return navigate(`/movies/details/${movieInfo.id}`);
      });
    }
  }

  return (
    <div className="container">
      <h2 className="subheader-title">Edit Movie</h2>
      <div className="row">
        <div className="col-12">
          <form className="needs-validation" onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                placeholder="Star Wars: Episode IV - A New Hope"
                className="form-control"
                id="title"
                name="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter a movie title.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">
                Genre(s) separated by commas:
              </label>
              <input
                type="text"
                placeholder="Sci-Fi, Action"
                className="form-control"
                id="genre"
                name="genre"
                value={genre}
                onChange={(event) => {
                  setGenre(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter at least one movie genre.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="details" className="form-label">
                Summary:
              </label>
              <textarea
                type="text"
                rows="3"
                placeholder="The Imperial Forces -- under orders from cruel Darth Vader (David Prowse) -- hold Princess Leia (Carrie Fisher) hostage, in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker (Mark Hamill) and Han Solo (Harrison Ford), captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 (Kenny Baker) and C-3PO (Anthony Daniels) to rescue the beautiful princess, help the Rebel Alliance, and restore freedom and justice to the Galaxy."
                className="form-control"
                id="details"
                name="details"
                value={details}
                onChange={(event) => {
                  setDetails(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter a movie summary.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Notes:
              </label>
              <textarea
                type="text"
                rows="3"
                placeholder="The first of many in the series and a classic!"
                className="form-control"
                id="notes"
                name="notes"
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">
                Please enter notes about this movie.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Added by:
              </label>
              <input
                type="text"
                placeholder="Tommy Trojan"
                className="form-control"
                id="user"
                name="user"
                value={user}
                onChange={(event) => {
                  setUser(event.target.value);
                }}
                required
              />
              <div className="invalid-feedback">Please enter your name.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="bookmark" className="form-label me-3">
                Bookmark Movie?
              </label>
              <input
                type="checkbox"
                id="bookmark"
                name="bookmark"
                value="bookmark"
                onChange={() => {
                  setBookmark(!bookmark);
                }}
                checked={bookmark}
              />
            </div>
            <button
              type="submit"
              className="btn btn-info confirm-btn mb-5 float-end"
            >
              Edit Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
