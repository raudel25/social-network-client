import { IconButton, Menu, MenuItem } from "@mui/material";
import { FC, useState, MouseEvent } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface DropdownMenuOption {
  text: string;
  action: () => void;
  icon: React.ReactNode;
}

interface DropdownMenuProps {
  options: DropdownMenuOption[];
}

const DropdownMenu: FC<DropdownMenuProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="more options" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((o, ind) => (
          <MenuItem key={ind} onClick={o.action}>
            <div className="center-content">
              <div className="mr-1 mt-1">{o.icon}</div>
              {o.text}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
