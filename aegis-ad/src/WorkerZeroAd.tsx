import { AbsoluteFill } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SceneCity } from "./scenes/SceneCity";
import { SceneWorkforce } from "./scenes/SceneWorkforce";
import { ScenePrivacy } from "./scenes/ScenePrivacy";
import { SceneLogo } from "./scenes/SceneLogo";
import { Grain, Vignette, ColorGrade } from "./components/Grain";

// Master 60s-capable timeline. Each scene is self-contained (its own frame
// clock via TransitionSeries.Sequence) and cross-dissolves into the next.
export const WORKER_ZERO_DURATION = 515;

export const WorkerZeroAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#02040a" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneCity />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <SceneWorkforce />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <ScenePrivacy />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={linearTiming({ durationInFrames: 15 })}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={130}>
          <SceneLogo />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Global grade applied over the whole film */}
      <ColorGrade />
      <Vignette strength={0.9} />
      <Grain opacity={0.045} />
    </AbsoluteFill>
  );
};
