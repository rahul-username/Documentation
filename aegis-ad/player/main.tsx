import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { WorkerZeroAd, WORKER_ZERO_DURATION } from "../src/WorkerZeroAd";

const App = () => (
  <div>
    <h1>WORKER ZERO</h1>
    <p>Interactive preview — play, pause, scrub the timeline, go fullscreen.</p>
    <div className="frame">
      <Player
        component={WorkerZeroAd}
        durationInFrames={WORKER_ZERO_DURATION}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        style={{ width: "100%" }}
        controls
        loop
        clickToPlay
        doubleClickToFullscreen
        spaceKeyToPlayOrPause
      />
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
