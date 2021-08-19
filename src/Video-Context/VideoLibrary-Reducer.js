import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useVid } from "./Video-Provider";

const VideoLibraryReducerContext = createContext();

export function VideoLibraryReducerProvider({ children }) {
  const videoSrc = useVid();

  const [videoState, videoDispatch] = useReducer(videoReducer, { videoSrc });

  return (
    <VideoLibraryReducerContext.Provider
      value={{
        videoState,
        videoDispatch
      }}
    >
      {children}
    </VideoLibraryReducerContext.Provider>
  );
}

export const useVideoLibraryReducer = () => {
  return useContext(VideoLibraryReducerContext);
};

const videoReducer = (state, action) => {
  const { username } = JSON.parse(localStorage.getItem("username")) || {
    username: null
  };
  console.log(action.type);

  switch (action.type) {
    case "ADD_TO_HISTORY":
      if (username)
        return axios
          .get(
            `https://videolib.sandeepmehta215.repl.co/addtohistoryvideos/${username}`,
            {
              params: {
                videoid: action.obj.videoDetails.id
              }
            }
          )
          .then((resp) => {
            localStorage.setItem(
              "historyvideos",
              JSON.stringify({ historyvideos: resp.data.history })
            );
          });

      return;

    case "REMOVE_FROM_HISTORY":
      if (username)
        return axios
          .get(
            `https://videolib.sandeepmehta215.repl.co/removefromhistoryvideos/${username}`,
            {
              params: {
                videoid: action.obj.videoDetails.id
              }
            }
          )
          .then((resp) => {
            localStorage.setItem(
              "historyvideos",
              JSON.stringify({ historyvideos: resp.data.history })
            );
          });
      return;

    case "ADD_TO_LIKED":
      if (username)
        return axios.get(
          `https://videolib.sandeepmehta215.repl.co/addtolikedvideos/${username}`,
          {
            params: {
              videoid: action.obj.videoDetails.id
            }
          }
        );

      return;
    case "REMOVE_FROM_LIKED":
      if (username)
        return axios.get(
          `https://videolib.sandeepmehta215.repl.co/removefromlikedvideos/${username}`,
          {
            params: {
              videoid: action.obj.videoDetails.id
            }
          }
        );

      return;

    case "SUBSCRIBE":
      if (username)
        return axios
          .get(
            `https://videolib.sandeepmehta215.repl.co/addtosubscription/${username}`,
            {
              params: {
                videoid: action.obj.videoDetails.id
              }
            }
          )
          .then((resp) => console.log(resp.data.message));
      return;

    case "SUBSCRIBED":
      if (username)
        return axios
          .get(
            `https://videolib.sandeepmehta215.repl.co/removefromsubscription/${username}`,
            {
              params: {
                videoid: action.obj.videoDetails.id
              }
            }
          )
          .then((resp) => console.log(resp.data.message));
      return;
    case "ADD_TO_WATCHLATER":
      if (username)
        return axios.get(
          `https://videolib.sandeepmehta215.repl.co/addtowatchlatervideos/${username}`,
          {
            params: {
              videoid: action.obj.videoDetails.id
            }
          }
        );

      return;
    case "REMOVE_FROM_WATCHLATER":
      if (username)
        return axios.get(
          `https://videolib.sandeepmehta215.repl.co/removefromwatchlatervideos/${username}`,
          {
            params: {
              videoid: action.obj.videoDetails.id
            }
          }
        );

      return;
    default:
      return;
  }
};
