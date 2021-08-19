import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const { login } = JSON.parse(localStorage.getItem("login")) || {
    login: null
  };

  const [isUserLoggedIn, setUserLogin] = useState(login);

  const [userExists, setUserExists] = useState(false);

  const [checkPassword, setCheckPassword] = useState(null);

  const [responseFromDB, setResponseFromDB] = useState(null);

  const [validUserName, setValidUserName] = useState("none");

  const [validPassword, setValidPassword] = useState("none");

  useEffect(() => {
    responseFromDB === "req can't be made"
      ? setUserExists("block")
      : setUserExists("none");

    responseFromDB === "invalid username"
      ? setValidUserName("block")
      : setValidUserName("none");

    responseFromDB === "invalid password"
      ? setValidPassword("block")
      : setValidPassword("none");

    responseFromDB === "wrong password"
      ? setCheckPassword("block")
      : setCheckPassword("none");

    if (responseFromDB === "user auth is successfull") {
      setUserLogin(true);
      localStorage.setItem("login", JSON.stringify({ login: true }));
    }
  }, [responseFromDB]);

  function LogOut() {
    setUserLogin(false);
    setUserExists("none");
    setCheckPassword("none");
    localStorage.removeItem("historyvideos");
    localStorage.removeItem("login");
    localStorage.removeItem("likedvideos");
    localStorage.removeItem("subscriptions");
    localStorage.removeItem("username");
    localStorage.removeItem("watchlatervideos");
    localStorage.removeItem("playlist");

    setTimeout(() => navigate("/"), 900);
  }

  function LoginUserWithCredentials(username, password) {
    (async function () {
      axios
        .get(`https://videolib.sandeepmehta215.repl.co/userauth/${username}`, {
          params: {
            password: password
          }
        })
        .then((resp) => {
          console.log(resp.data.message);

          if (resp.data.message) {
            setResponseFromDB(resp.data.message);

            if (resp.data.message === "user auth is successfull") {
              setUserLogin(true);

              localStorage.setItem("login", JSON.stringify({ login: true }));

              localStorage.setItem(
                "historyvideos",
                JSON.stringify({ historyvideos: resp.data.historyvideos })
              );

              localStorage.setItem(
                "likedvideos",
                JSON.stringify({ likedvideos: resp.data.likedvideos })
              );

              localStorage.setItem(
                "subscriptions",
                JSON.stringify({ subscriptions: resp.data.subscriptions })
              );

              localStorage.setItem(
                "watchlatervideos",
                JSON.stringify({ watchlatervideos: resp.data.watchlatervideos })
              );

              localStorage.setItem(
                "playlist",
                JSON.stringify({ playlist: resp.data.playlist })
              );

              localStorage.setItem(
                "username",
                JSON.stringify({ username: resp.data.username })
              );

              setTimeout(() => navigate("/"), 800);
            }
          }
        });
    })();
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        LogOut,
        LoginUserWithCredentials,
        setCheckPassword,
        checkPassword,
        setUserExists,
        validUserName,
        validPassword,
        userExists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
