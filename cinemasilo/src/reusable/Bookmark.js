import { Link } from "react-router-dom";
import "../styles/Bookmark.css";

export default function Bookmarkable(props) {
  return (
    <div
      className={
        props.type === "bookmarks-page" ? "movie-div card mb-3" : "card mb-3"
      }
      data-testid="bookmarkable"
    >
      <div className="container">
        <div className="row">
          {props.bookmarkUser !== "null" &&
          props.bookmarkDatetime !== "null" ? (
            <p
              className="col-10 d-flex align-items-center text-end justify-content-end"
              style={{ height: "64px" }}
            >
              <em>
                {props.bookmarkUser}
                <br />
                {props.bookmarkDatetime}
              </em>
            </p>
          ) : (
            <p className="col-10" style={{ height: "64px" }}></p>
          )}
          <div className="col-2 text-center">
            <Bookmark renderBookmark={props.children} />
          </div>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.genre}</h6>
        <div className="card-text">
          <p>
            <em>{props.userAdded}</em>
          </p>
          {props.type === "bookmarks-page" ? (
            <></>
          ) : (
            <>
              <h5>Summary:</h5>
              <p>{props.details}</p>
            </>
          )}
          <h5>Notes:</h5>
          {props.type === "bookmarks-page" ? (
            <p className="movie-notes">
              {props.notes.length <= 100
                ? props.notes
                : `${props.notes.substring(0, 101)} ...`}
            </p>
          ) : (
            <p>{props.notes}</p>
          )}
          <br />
        </div>
        {props.type === "bookmarks-page" ? (
          <Link
            className="btn btn-custom d-flex justify-content-center"
            to={`/movies/details/${props.movieId}`}
          >
            View Details
          </Link>
        ) : props.type !== "test" ? (
          <Link
            className="btn btn-custom d-flex justify-content-center"
            to={`/movies/edit/${props.movieId}`}
          >
            Edit Details
          </Link>
        ) : (
          <div>Link Here</div>
        )}
      </div>
    </div>
  );
}

function Bookmark(props) {
  return props.renderBookmark();
}
