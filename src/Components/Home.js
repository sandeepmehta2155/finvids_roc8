import { useNavigate } from "react-router-dom";
import { useVid } from "../Video-Context/Video-Provider";
import { useVideoLibraryReducer } from "../Video-Context/VideoLibrary-Reducer";

import * as useComponent from "../index";

export function Home() {
  const { videoSrc } = useVid();

  const { videoDispatch } = useVideoLibraryReducer();

  const navigate = useNavigate();

  return (
    <>
      <useComponent.Navigation />
      <div className="videoBadges">
        <ul className="videoList">
          {videoSrc.map((obj) => (
            <li
              key={obj.videoDetails.id}
              className="videoCard"
              id={obj.videoDetails.id}
              onClick={() => {
                videoDispatch({ type: "ADD_TO_HISTORY", obj });
                navigate(`/video/${obj.videoDetails.id}`);
              }}
            >
              <img
                className="videoSnippet"
                title={obj.videoDetails.title}
                src={obj.srcLinks?.imgSrc}
                alt="loading"
              />
              <h3>
                <img
                  className="streamerIcon"
                  src={obj.videoDetails.streamerIcon}
                  alt="loading"
                />
                <span className="streamer"> {obj.videoDetails.streamer}</span>
              </h3>
              <div>{obj.videoDetails.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
