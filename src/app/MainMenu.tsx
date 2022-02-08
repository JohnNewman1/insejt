import { h,  FunctionComponent } from "preact";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import GoogleIcon from '@mui/icons-material/Google';

type MainMenuProps = {
  setMenu: (bool: boolean) => void;
  setMostPopular: () => void;
};

const MainMenu: FunctionComponent<MainMenuProps> = ({setMenu, setMostPopular}: MainMenuProps) => {

  const clickMostPopular = () => {
    setMostPopular();
    setMenu(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 375, bgcolor: 'background.paper' }}>
    <nav aria-label="main mailbox folders">
      <List>
        <ListItem onClick={() => clickMostPopular()} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="Most Popular" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GoogleIcon/>
            </ListItemIcon>
            <ListItemText primary="Google Searches" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  </Box>
  )
}

export default MainMenu;