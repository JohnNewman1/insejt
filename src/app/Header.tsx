import { h,  FunctionComponent } from "preact";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

type HeaderProps = {
	showSettingsIcon: boolean;
	goToSettingsPage: () => void;
  };

const Header: FunctionComponent<HeaderProps> = ({showSettingsIcon, goToSettingsPage}: HeaderProps) => {

	const buttonStyle = {
		backgroundColor: '#536DFE',
		zIndex: 3
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Insejt
				</Typography>
				{
					showSettingsIcon && <IconButton aria-label="Settings" onClick={() => goToSettingsPage()} style={buttonStyle} sx={{ boxShadow: 3 }}  >
						<SettingsIcon style={{color: 'white'}} />
					</IconButton>
				}
			</Toolbar>
		</AppBar>
	)
}

export default Header;