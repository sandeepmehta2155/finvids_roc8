import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth-context";

export function Login() {
  const [userName, setUserName] = useState(null);
  const [passwordInput, setUserPassword] = useState("");

  const {
    userExists,
    setUserExists,
    setCheckPassword,
    validUserName,
    validPassword,
    isUserLoggedIn,
    checkPassword,
    LogOut,
    LoginUserWithCredentials
  } = useAuth();

  function LoginHandler() {
    userName ? setUserExists("none") : setUserExists("block");

    passwordInput ? setCheckPassword("none") : setCheckPassword("block");
    return isUserLoggedIn
      ? LogOut()
      : LoginUserWithCredentials(userName, passwordInput);
  }
  return (
    <>
      <div className="modalForLogin">
        <h2>Login</h2>

        <label>Enter your user-name : </label>
        <input
          type="text"
          id="txt"
          placeholder="    User name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <br />

        <small style={{ color: "red", display: userExists }}>
          User doesn't exists
        </small>
        <small style={{ color: "red", display: validUserName }}>
          Enter valid UserName
        </small>

        <br />
        <label> Enter your password : </label>
        <input
          type="password"
          id="email"
          placeholder="     Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />
        <br />
        <small style={{ color: "red", display: validPassword }}>
          Enter valid Password
        </small>
        <small style={{ color: "red", display: checkPassword }}>
          Enter Correct Password
        </small>

        <br />

        <button className="LoginButton" onClick={LoginHandler}>
          {isUserLoggedIn ? "Logout" : "Login"}
        </button>

        <Link to="/signup">
          <button className="SignupButton">Sign Up</button>
        </Link>
        <br />

        {isUserLoggedIn && (
          <span style={{ color: "green" }}>
            User Logged in successfully
            <span role="img" aria-labelledby="emoji">
              ✅
            </span>
          </span>
        )}
      </div>
    </>
  );
}
