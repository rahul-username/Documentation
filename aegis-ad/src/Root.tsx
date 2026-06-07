import { Composition } from "remotion";
import { WorkerZeroAd, WORKER_ZERO_DURATION } from "./WorkerZeroAd";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WorkerZeroAd"
      component={WorkerZeroAd}
      durationInFrames={WORKER_ZERO_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
