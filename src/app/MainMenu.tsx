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
  setMostPopular: () => void;
  setGoogle: () => void;
};

const MainMenu: FunctionComponent<MainMenuProps> = ({setMostPopular, setGoogle}: MainMenuProps) => {


	return (
		<Box sx={{ width: '100%', maxWidth: 375, bgcolor: 'background.paper' }}>
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem onClick={() => setMostPopular()} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText primary="Most Popular" />
						</ListItemButton>
					</ListItem>
					<ListItem onClick={() => setGoogle()} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<GoogleIcon />
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