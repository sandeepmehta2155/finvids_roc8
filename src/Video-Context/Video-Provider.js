import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const VideoContext = createContext();

export function VideoProvider({ children }) {
  useEffect(
    () =>
      (async function () {
        try {
          axios
            .get("https://videolib.sandeepmehta215.repl.co/videoprovider")
            .then((resp) => setVideoSrc(resp.data.videoSrc));
        } catch (error) {
          console.log(error);
          setVideoSrc([]);
        }
      })(),
    []
  );
  const [videoSrc, setVideoSrc] = useState([]);
  return (
    <VideoContext.Provider value={{ videoSrc }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVid() {
  return useContext(VideoContext);
}
