import { Avatar } from "@mui/material";
import { JSX } from "react";

import getUserAvatarSVG from "../../utils/getUserAvatarSVG";
import Tooltip from "./Tooltip";

interface UserAvatarProps {
  username: string;
  displayName: string;
}

const UserAvatar = (props: UserAvatarProps): JSX.Element => {
  const { username, displayName } = props;

  return (
    <Tooltip title={displayName}>
      <Avatar
        src={getUserAvatarSVG(username)}
        sx={{ height: 32, width: 32, backgroundColor: "grey.300" }}
      >
        {displayName}
      </Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
