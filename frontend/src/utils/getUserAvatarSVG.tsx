import { createAvatar } from "@dicebear/core";
import { bottts } from "@dicebear/collection";

const getUserAvatarSVG = (username: string): string => {
  const svg = createAvatar(bottts, {
    seed: username,
    backgroundColor: ["#eeeeee"],
  });

  return svg.toDataUriSync();
};

export default getUserAvatarSVG;
