import { Composition } from "remotion";
import { VoidTeaser } from "./VoidTeaser";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VoidTeaser"
      component={VoidTeaser}
      durationInFrames={420}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
