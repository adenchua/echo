import { Avatar } from "@mui/material";

import getUserAvatarSVG from "../../utils/getUserAvatarSVG";

interface UserAvatarProps {
  username: string;
  displayName: string;
}

const UserAvatar = (props: UserAvatarProps): JSX.Element => {
  const { username, displayName } = props;

  return (
    <Avatar src={getUserAvatarSVG(username)} sx={{ height: 32, width: 32, backgroundColor: "grey.300" }}>
      {displayName}
    </Avatar>
  );
};

export default UserAvatar;
