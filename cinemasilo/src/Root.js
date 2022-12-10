import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";
import { useEffect } from "react";

export default function Root() {
  useEffect(() => {
    document.title = "CinemaSilo";
  }, []);

  return (
    <div className="container-fullwidth">
      <Navigation />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
