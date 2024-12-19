import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ReactNode } from "react";
import { Link } from "react-router";

interface NavbarListItemProps {
  isSelected: boolean;
  icon: ReactNode;
  buttonText: string;
  linkTo: string;
}

const NavbarListItem = (props: NavbarListItemProps) => {
  const { linkTo, isSelected, icon, buttonText } = props;

  return (
    <ListItemButton
      component={Link}
      to={linkTo}
      dense
      selected={isSelected}
      sx={{
        "&.Mui-selected": {
          bgcolor: "primary.main",
          borderRadius: 100,
          "&:hover": { bgcolor: "primary.main" },
        },
      }}
    >
      <ListItemAvatar>
        <Avatar variant="rounded" sx={{ bgcolor: "transparent", height: 24, width: 24 }}>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={buttonText}
        sx={{ color: "#FFF" }}
        slotProps={{
          primary: { noWrap: true },
        }}
      />
    </ListItemButton>
  );
};

export default NavbarListItem;
