import { Routes, Route } from "react-router-dom";
import * as useComponent from "../index";

export function RouteComponents() {
  return (
    <>
      <Routes>
        <Route path="/" element={<useComponent.Home />} />
        <Route path="/history" element={<useComponent.HistoryPage />} />
        <Route path="/login" element={<useComponent.Login />} />
        <Route path="/likedvideos" element={<useComponent.LikedVideos />} />
        <Route path="/subscription" element={<useComponent.Subscription />} />
        <Route path="/video/:videoID" element={<useComponent.VideoPage />} />
        <Route path="/watchlater" element={<useComponent.WatchLater />} />
        <Route path="*" element={<useComponent.RedirectPage />} />
        <Route path="/signup" element={<useComponent.SignUp />} />
      </Routes>
    </>
  );
}
