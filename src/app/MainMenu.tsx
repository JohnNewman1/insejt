import { h,  FunctionComponent } from "preact";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

type MainMenuProps = {
  setMenu: (bool: boolean) => void;
};

const MainMenu: FunctionComponent<MainMenuProps> = ({setMenu}: MainMenuProps) => {


  return (
    <Box sx={{ width: '100%', maxWidth: 375, bgcolor: 'background.paper' }}>
    <nav aria-label="main mailbox folders">
      <List>
        <ListItem onClick={() => setMenu(false)} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              Icon
            </ListItemIcon>
            <ListItemText primary="Most Popular" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
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