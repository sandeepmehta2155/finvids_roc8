import { useVid } from "../Video-Context/Video-Provider";
import { Link, useNavigate } from "react-router-dom";
import * as useComponent from "../index";
import { ReactComponent as Img } from "./watchlater.svg";
import { useState } from "react";
import { ReactComponent as RemoveButton } from "../Components/remove-button.svg";
import axios from "axios";
import { useVideoLibraryReducer } from "../Video-Context/VideoLibrary-Reducer";

export function WatchLater() {
  const { videoSrc } = useVid();

  const { videoDispatch } = useVideoLibraryReducer();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const { watchlatervideos } = JSON.parse(
    localStorage.getItem("watchlatervideos")
  ) || {
    watchlatervideos: []
  };

  const [watchlatervideo, setWatchLaterVideo] = useState(watchlatervideos);

  const [popUp, setPopUp] = useState("none");

  const navigate = useNavigate();

  async function CallWatchLaterVideos() {
    if (username)
      axios
        .get(
          `https://videolib.sandeepmehta215.repl.co/addtowatchlatervideos?id=${username}`
        )
        .then((resp) => {
          setPopUp("none");

          if (typeof resp.data.watchlatervideos === "object") {
            localStorage.setItem(
              "watchlatervideos",
              JSON.stringify({ watchlatervideos: resp.data.watchlatervideos })
            );

            setWatchLaterVideo(resp.data.watchlatervideos);
          } else {
            setWatchLaterVideo([]);
          }
        });
  }

  return (
    <>
      <useComponent.Navigation />
      <div className="WatchLaterItems">
        <h1 className="WatchLaterTag"> Watch-Later </h1>
        <div className="snackBar" style={{ display: popUp }}>
          Updating WatchLater Videos.....
        </div>
        {username === null && (
          <>
            <Img className="navigateVideosImg" />
            {"   "}
            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/login")}
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
            {videoSrc.map((obj) =>
              watchlatervideo
                .map((watchLaterVideoObj) => {
                  if (watchLaterVideoObj !== obj?.videoDetails.id) return obj;
                  return undefined;
                })
                .filter((key) => key !== undefined).length <
              watchlatervideo.length ? (
                <>
                  <li key={obj?.videoDetails.id} className="WatchLaterList">
                    <RemoveButton
                      className="removeButton"
                      onClick={() => {
                        setPopUp("block");

                        videoDispatch({ type: "REMOVE_FROM_WATCHLATER", obj });

                        setTimeout(() => CallWatchLaterVideos(), 800);
                      }}
                    />
                    <Link
                      to={`/video/${obj?.videoDetails.id}`}
                      key={obj?.videoDetails.id}
                    >
                      <img
                        className="videoSnippet WatchLater"
                        title={obj?.videoDetails.title}
                        src={obj?.srcLinks.imgSrc}
                        alt="loading"
                      />
                      <h3>{obj?.videoDetails.title}</h3>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )
            )}
          </ul>
        )}
        {username !== null && watchlatervideo.length === 0 && (
          <>
            <Img className="navigateVideosImg" onClick={() => navigate("/")} />
            {"  "}{" "}
            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/")}
            >
              Add Videos to watch it later
              <span role="img" aria-labelledby="emoji">
                ⌚
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
}
