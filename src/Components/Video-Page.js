import { useVid } from "../Video-Context/Video-Provider";
import { useVideoLibraryReducer } from "../Video-Context/VideoLibrary-Reducer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function VideoPage() {
  const { videoID } = useParams();
  const { videoSrc } = useVid();
  const { videoDispatch } = useVideoLibraryReducer();
  const navigate = useNavigate();

  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };

  const { likedvideos } = JSON.parse(localStorage.getItem("likedvideos")) || {
    likedvideos: []
  };

  const [popUp, setPopUp] = useState("none");

  const [likedvideo, setLikedVideo] = useState(likedvideos);

  const { watchlatervideos } = JSON.parse(
    localStorage.getItem("watchlatervideos")
  ) || {
    watchlatervideos: []
  };

  const [watchLaterVideos, setWatchLaterVideos] = useState(watchlatervideos);

  // const { playlist } = JSON.parse(localStorage.getItem("playlist")) || {
  //   playlist: []
  // };

  // const [playList, setPlayList] = useState(playlist);

  const { subscriptions } = JSON.parse(
    localStorage.getItem("subscriptions")
  ) || {
    subscriptions: []
  };

  const [subscription, setSubscription] = useState(subscriptions);

  const obj = videoSrc.find(({ videoDetails }) => videoDetails.id === videoID);

  const streamerVideopage = obj?.videoDetails.streamer;

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

            setWatchLaterVideos(resp.data.watchlatervideos);
          } else {
            setWatchLaterVideos([]);
          }
        });
  }

  async function CallSubscriptions() {
    if (username)
      axios
        .get(
          `https://videolib.sandeepmehta215.repl.co/addtosubscription?id=${username}`
        )
        .then((resp) => {
          setPopUp("none");

          if (typeof resp.data.subscriptions === "object") {
            localStorage.setItem(
              "subscriptions",
              JSON.stringify({ subscriptions: resp.data.subscriptions })
            );

            setSubscription(resp.data.subscriptions);
          } else {
            setSubscription([]);
          }
        });
  }

  return (
    videoSrc && (
      <div className="videoPage">
        <iframe
          width="560"
          height="315"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          className="videoPageVideoSnippet"
          title={obj?.videoDetails.title || null}
          src={obj?.srcLinks.vidSrc}
        />
        <h3 className="videoSnippetTitle">{obj?.videoDetails.title}</h3>

        <br />
        <span className="dateAndviewPills">
          {obj?.videoDetails.views}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-dot"
            viewBox="0 0 12 12"
          >
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          </svg>{" "}
          {obj?.videoDetails.date}
        </span>
        <div></div>
        <div className="videoSub">
          <img
            className="streamerIcon"
            src={obj?.videoDetails.streamerIcon}
            alt="loading"
          />
          <span>
            {subscription
              .map((subscriptionObject) => {
                if (subscriptionObject !== obj?.videoDetails.id) return obj;
                return undefined;
              })
              .filter((key) => key !== undefined).length <
            subscription.length ? (
              <button
                className="subscribedTag"
                onClick={() => {
                  setPopUp("block");

                  username
                    ? videoDispatch({ type: "SUBSCRIBED", obj })
                    : navigate("/login");

                  setTimeout(() => CallSubscriptions(), 1000);
                }}
              >
                Subscribed
              </button>
            ) : (
              <button
                onClick={() => {
                  setPopUp("block");

                  username
                    ? videoDispatch({ type: "SUBSCRIBE", obj })
                    : navigate("/login");

                  setTimeout(() => CallSubscriptions(), 1000);
                }}
                className="subscribeTag"
              >
                Subscribe
              </button>
            )}{" "}
          </span>
          <button className="bi bi-collection-play-fill">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437z" />
            </svg>
          </button>
          {likedvideo
            .map((likevideoObject) => {
              if (likevideoObject !== obj?.videoDetails.id) return obj;
              return undefined;
            })
            .filter((key) => key !== undefined).length < likedvideo.length ? (
            <button
              className="bi bi-hand-thumbs-upButton"
              onClick={() => {
                setPopUp("block");

                username
                  ? videoDispatch({ type: "REMOVE_FROM_LIKED", obj })
                  : navigate("/login");

                setTimeout(() => CallLikedVideos(), 1000);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-hand-thumbs-up fill"
                viewBox="0 0 20 20"
                onClick={() => {
                  setPopUp("block");

                  username
                    ? videoDispatch({ type: "REMOVE_FROM_LIKED", obj })
                    : navigate("/login");

                  setTimeout(() => CallLikedVideos(), 1000);
                }}
              >
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
            </button>
          ) : (
            <button
              className="bi bi-hand-thumbs-upButton"
              onClick={() => {
                setPopUp("block");

                username
                  ? videoDispatch({ type: "ADD_TO_LIKED", obj })
                  : navigate("/login");

                setTimeout(() => CallLikedVideos(), 1000);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-hand-thumbs-up"
                viewBox="0 0 20 20"
                onClick={() => {
                  setPopUp("block");

                  username
                    ? videoDispatch({ type: "ADD_TO_LIKED", obj })
                    : navigate("/login");

                  setTimeout(() => CallLikedVideos(), 1000);
                }}
              >
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
              </svg>
            </button>
          )}

          {watchLaterVideos
            .map((watchlatervideoObject) => {
              if (watchlatervideoObject !== obj?.videoDetails.id) return obj;
              return undefined;
            })
            .filter((key) => key !== undefined).length <
          watchLaterVideos.length ? (
            <button
              className="bi bi-stopwatch"
              onClick={() => {
                setPopUp("block");

                username
                  ? videoDispatch({ type: "REMOVE_FROM_WATCHLATER", obj })
                  : navigate("/login");

                setTimeout(() => CallWatchLaterVideos(), 1000);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-stopwatch-fill"
                viewBox="0 0 20 20"
              >
                <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584.531.531 0 0 0 .013-.012l.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354a.717.717 0 0 0-.012.012A6.973 6.973 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1h-3zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0z" />
              </svg>
            </button>
          ) : (
            <button
              className="bi bi-stopwatch"
              onClick={() => {
                setPopUp("block");

                username
                  ? videoDispatch({ type: "ADD_TO_WATCHLATER", obj })
                  : navigate("/login");

                setTimeout(() => CallWatchLaterVideos(), 1000);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
              </svg>
            </button>
          )}
          <p>{obj?.videoDetails.contentCovered}</p>
        </div>

        {/* SIDE NAV FOR DISPLAYING RELATED VIDEOS*/}

        <ul className="relatedVideos">
          {videoSrc.map(({ videoDetails, srcLinks: src }) => {
            return (
              streamerVideopage === videoDetails.streamer && (
                <Link to={`/video/${videoDetails.id}`}>
                  <img
                    className="videoSnippet"
                    title={videoDetails.title}
                    src={src.imgSrc}
                    alt="loading"
                  />
                  <h3>{videoDetails.title}</h3>
                </Link>
              )
            );
          })}
        </ul>
      </div>
    )
  );
}
