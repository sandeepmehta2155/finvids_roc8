import { useVid } from "../Video-Context/Video-Provider";
import { Link, useNavigate } from "react-router-dom";
import * as useComponent from "../index";
import { ReactComponent as Img } from "./like.svg";
import { ReactComponent as RemoveButton } from "../Components/remove-button.svg";
import { useState } from "react";
import axios from "axios";
import { useVideoLibraryReducer } from "../Video-Context/VideoLibrary-Reducer";

export function LikedVideos() {
  const { videoSrc } = useVid();

  const { videoDispatch } = useVideoLibraryReducer();

  const { likedvideos } = JSON.parse(localStorage.getItem("likedvideos")) || {
    likedvideos: []
  };
  const [likedvideo, setLikedVideo] = useState(likedvideos);
  const navigate = useNavigate();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const [popUp, setPopUp] = useState("none");

  async function CallLikedVideos() {
    if (username)
      axios
        .get(
          `https://videolib.sandeepmehta215.repl.co/addtolikedvideos?id=${username}`
        )
        .then((resp) => {
          setPopUp("none");

          if (typeof resp.data.likedvideos === "object") {
            localStorage.setItem(
              "likedvideos",
              JSON.stringify({ likedvideos: resp.data.likedvideos })
            );

            setLikedVideo(resp.data.likedvideos);
          } else {
            setLikedVideo([]);
          }
        });
  }

  return (
    <>
      <useComponent.Navigation />
      <div className="LikedItems">
        <h1 className="LikedTag">Liked Videos</h1>
        <div className="snackBar" style={{ display: popUp }}>
          Updating Liked Videos.....
        </div>
        {username === null && (
          <>
            <Img className="navigateVideosImg" />
            <button
              className="buttonToNavigateToHome"
              onClick={() => navigate("/login")}
            >
              {" "}
              Please Login to view your liked videos{" "}
              <span role="img" aria-labelledby="emoji">
                👍
              </span>
            </button>
          </>
        )}
        {username !== null && (
          <>
            <ul>
              {videoSrc.map((obj) =>
                likedvideo
                  .map((likevideoObject) => {
                    if (likevideoObject !== obj?.videoDetails.id) return obj;
                    return undefined;
                  })
                  .filter((key) => key !== undefined).length <
                likedvideo.length ? (
                  <>
                    <li key={obj?.videoDetails.id} className="LikedList">
                      <RemoveButton
                        className="removeButton"
                        onClick={() => {
                          setPopUp("block");

                          videoDispatch({ type: "REMOVE_FROM_LIKED", obj });

                          setTimeout(() => CallLikedVideos(), 800);
                        }}
                      />
                      <Link
                        to={`/video/${obj?.videoDetails.id}`}
                        key={obj?.videoDetails.id}
                      >
                        <img
                          className="videoSnippet Liked"
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
          </>
        )}
        {username !== null && likedvideo.length === 0 && (
          <>
            <h2>Opps you haven't liked any video !!!</h2>
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
