import { ReactComponent as Img1 } from "./Redirect404Page.svg";
import { Link } from "react-router-dom";

export function RedirectPage() {
  return (
    <>
      <div className="redirectPage">
        <Img1 className="redirectImage" />
        <Link className="redirectButton" to="/">
          <button className="redirectButton">
            {" "}
            Back to Home{" "}
            <span role="img" aria-labelledby="Home">
              🏠
            </span>
          </button>
        </Link>
      </div>
    </>
  );
}
