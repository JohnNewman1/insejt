import { h,  FunctionComponent } from "preact";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: FunctionComponent = () => {

  return (
         <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Insejt
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Header;