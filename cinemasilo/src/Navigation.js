import { Link, useLocation } from "react-router-dom";
import logo from "./images/logo.png";
import "bootstrap/dist/js/bootstrap.bundle.js";

export default function Navigation() {
  const location = useLocation().pathname;
  const bookmarksPage = location === "/";
  const moviesPage = location === "/movies";
  const createPage = location === "/movies/create";

  const activeClass = "nav-link active";
  const inactiveClass = "nav-link";
  const activeAria = "page";
  const inactiveAria = "false";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-4">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            width="24"
            height="24"
            className="d-inline-block align-text-top me-3"
          />
          CinemaSilo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={bookmarksPage ? activeClass : inactiveClass}
                aria-current={bookmarksPage ? activeAria : inactiveAria}
              >
                Bookmarks
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/movies"
                className={moviesPage ? activeClass : inactiveClass}
                aria-current={moviesPage ? activeAria : inactiveAria}
              >
                All Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/movies/create"
                className={createPage ? activeClass : inactiveClass}
                aria-current={createPage ? activeAria : inactiveAria}
              >
                Add Movie
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
