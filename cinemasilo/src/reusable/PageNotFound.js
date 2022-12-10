import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import "../styles/PageNotFound.css";

export default function PageNotFound() {
  useEffect(() => {
    document.title = "404 Page Not Found";
  }, []);

  return (
    <div>
      <Navigation />
      <div className="container pagenotfound" data-testid="pagenotfound">
        <h1>404</h1>
        <h3>Page not found.</h3>
        <h6>The page you were looking for does not exist.</h6>
        <br />
        <Link to="/" className="btn btn-link btn-custom">
          Go Home
        </Link>
      </div>
    </div>
  );
}
