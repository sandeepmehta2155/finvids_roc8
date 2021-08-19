import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Login/auth-context";

export function Header() {
  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const navigate = useNavigate();

  const { LogOut } = useAuth();

  function loginHandler() {
    username !== null ? LogOut() : navigate("/login");
  }

  return (
    <header className="header">
      <Link to="/">
        <h1 className="name">Finvids</h1>
      </Link>

      <button onClick={() => loginHandler()} className="bi bi-person-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
        </svg>
        <span onClick={() => loginHandler()}>
          {username ? "Logout" : "Login"}
        </span>
      </button>

      <Link to="/">
        <button className="bi bi-house-fill">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
            <path d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
          </svg>
        </button>
      </Link>
      {/* <input placeholder="Search" type="search" className="search" /> */}
    </header>
  );
}
