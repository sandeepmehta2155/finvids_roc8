import { useVid } from "../Video-Context/Video-Provider";
import { Link, useNavigate } from "react-router-dom";
import * as useComponent from "../index";
import { ReactComponent as Img } from "./subscription.svg";

export function Subscription() {
  const { videoSrc } = useVid();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const navigate = useNavigate();

  return (
    <>
      <useComponent.Navigation />

      <div className="SubscribedItems">
        <h1 className="SubscriptionTag">Subscription</h1>
        <br />
        <br />
        <h2 className="SubscriptionTag">
          Sorry, this page is under development
        </h2>
        {username === null && (
          <>
            {" "}
            <Img onClick={() => navigate("/")} className="navigateVideosImg" />
            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/")}
            >
              {" "}
              Please login to watch videos
              <br /> added to watch later{" "}
              <span role="img" aria-labelledby="emoji">
                👍
              </span>
            </button>
          </>
        )}
        {username !== null && (
          <ul>
            {videoSrc.map(
              ({ subscription, videoDetails, srcLinks }) =>
                subscription === "yes" && (
                  <Link to={`/video/${videoDetails.id}`} key={videoDetails.id}>
                    <li key={videoDetails.id} className="SubscriptionList">
                      <img
                        className="videoSnippet Subscription"
                        title={videoDetails.title}
                        src={srcLinks.imgSrc}
                        alt="loading"
                      />
                      <h3>{videoDetails.title}</h3>
                    </li>
                  </Link>
                )
            )}
          </ul>
        )}
      </div>
    </>
  );
}
