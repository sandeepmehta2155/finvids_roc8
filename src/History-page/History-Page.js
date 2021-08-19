import { useVid } from "../Video-Context/Video-Provider";
import { Link, useNavigate } from "react-router-dom";
import * as useComponent from "../index";
import { ReactComponent as Img } from "./history.svg";
import { ReactComponent as RemoveButton } from "../Components/remove-button.svg";
import { useVideoLibraryReducer } from "../Video-Context/VideoLibrary-Reducer";
import { useState } from "react";
import axios from "axios";

export function HistoryPage() {
  const { videoSrc } = useVid();

  const { videoDispatch } = useVideoLibraryReducer();

  const navigate = useNavigate();

  const { historyvideos } = JSON.parse(
    localStorage.getItem("historyvideos")
  ) || {
    historyvideos: []
  };

  const [historyvideo, setHistoryVideo] = useState(historyvideos);

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const [popUp, setPopUp] = useState("none");

  async function CallHistoryVideos() {
    if (username)
      axios
        .get(
          `https://videolib.sandeepmehta215.repl.co/addtohistoryvideos?id=${username}`
        )
        .then((resp) => {
          setPopUp("none");

          if (typeof resp.data.historyvideos === "object") {
            localStorage.setItem(
              "historyvideos",
              JSON.stringify({ historyvideos: resp.data.historyvideos })
            );

            setHistoryVideo(resp.data.historyvideos);
          } else {
            setHistoryVideo([]);
          }
        });
  }

  return (
    <>
      <useComponent.Navigation />
      <div className="HistoryItems">
        <h1 className="HistoryTag"> History </h1>
        <div className="snackBar" style={{ display: popUp }}>
          Updating History Videos.....
        </div>

        {username === null && (
          <>
            <Img
              className="navigateVideosImg"
              onClick={() => navigate("/login")}
            />
            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/login")}
            >
              {" "}
              Please Login to view your history videos{" "}
              <span role="img" aria-labelledby="emoji">
                👍
              </span>
            </button>
          </>
        )}
        {username !== null && (
          <ul>
            {videoSrc.map((obj) =>
              historyvideo
                .map((historyVideoObj) => {
                  if (historyVideoObj !== obj?.videoDetails.id) return obj;
                  return undefined;
                })
                .filter((key) => key !== undefined).length <
              historyvideo.length ? (
                <>
                  <li key={obj?.videoDetails.id} className="HistoryList">
                    <RemoveButton
                      className="removeButton"
                      onClick={() => {
                        setPopUp("block");

                        videoDispatch({ type: "REMOVE_FROM_HISTORY", obj });

                        setTimeout(() => CallHistoryVideos(), 800);
                      }}
                    />
                    <Link to={`/video/${obj?.videoDetails.id}`}>
                      <img
                        className="videoSnippet History"
                        title={obj?.videoDetails.title}
                        src={obj?.srcLinks.imgSrc}
                        alt="loading"
                      />
                      <br />
                      <h3>{obj?.videoDetails.title}</h3>
                    </Link>
                  </li>
                </>
              ) : (
                <> </>
              )
            )}
          </ul>
        )}
        {username !== null && historyvideo.length === 0 && (
          <>
            <h2>Your history seems to be empty !!!</h2>
            <Img className="navigateVideosImg" onClick={() => navigate("/")} />

            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/")}
            >
              Click here to watch videos
            </button>
          </>
        )}
      </div>
    </>
  );
}
