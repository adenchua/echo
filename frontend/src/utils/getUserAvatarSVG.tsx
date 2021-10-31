import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";

const getUserAvatarSVG = (username: string): string => {
  const svg = createAvatar(style, {
    seed: username,
    dataUri: true,
    backgroundColor: "#eeeeee",
  });

  return svg;
};

export default getUserAvatarSVG;
