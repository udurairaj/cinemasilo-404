import { useLoaderData, useNavigate } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Bookmarkable from "../reusable/Bookmark";
import { deleteBookmark } from "../api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Popup from "../reusable/Popup";

export default function Index() {
  const bookmarkedMovies = useLoaderData();
  const [clickedBookmarkId, setClickedBookmarkId] = useState("null");
  const [clickedMovieId, setClickedMovieId] = useState("null");
  const [popupOpen, setPopupOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const navigate = useNavigate();

  function onClick(event) {
    setClickedBookmarkId(event.currentTarget.id);
    setClickedMovieId(event.currentTarget.value);

    setPopupOpen(true);
  }

  useEffect(() => {
    document.title = "Bookmarked Movies";
  }, []);

  useEffect(() => {
    const refresh = () => navigate("/");
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
      <h1 className="header-title">Bookmarks</h1>
      <div className="row">
        {bookmarkedMovies.map((bookmark) => {
          const movie = bookmark.movies[0];
          return (
            <div
              key={bookmark.id}
              className="col-lg-4 col-md-6 col-sm-12"
              data-testid="bookmarked-movies"
            >
              <Bookmarkable
                movieId={movie.id}
                title={movie.title}
                genre={movie.genre}
                userAdded={`Added by: ${movie.user}`}
                bookmarkUser={`Bookmarked by: ${bookmark.user}`}
                bookmarkDatetime={`at ${bookmark.datetime}`}
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
                        color="#5668a6"
                        size="3x"
                      />
                    </button>
                  );
                }}
              </Bookmarkable>
            </div>
          );
        })}
      </div>
      {popupOpen && (
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
    </div>
  );
}
