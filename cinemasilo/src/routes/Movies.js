import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Movies() {
  useEffect(() => {
    document.title = "Movies";
  }, []);

  return (
    <div>
      <h1 className="header-title">Movies</h1>
      <Outlet />
    </div>
  );
}
