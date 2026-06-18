import { Composition } from "remotion";
import { ParagonEcosystemLoop } from "./ParagonEcosystemLoop";
import { ParagonGlobalAdaptabilityLoop } from "./ParagonGlobalAdaptabilityLoop";
import { ParagonUmbrellaLoop } from "./ParagonUmbrellaLoop";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ParagonUmbrellaLoop"
        component={ParagonUmbrellaLoop}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ParagonGlobalAdaptabilityLoop"
        component={ParagonGlobalAdaptabilityLoop}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ParagonEcosystemLoop"
        component={ParagonEcosystemLoop}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
