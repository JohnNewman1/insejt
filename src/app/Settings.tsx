import { h,  FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent, TextField, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SettingsConfig } from "./types";

type SettingsProps = {
	settingsConfig: SettingsConfig;
	goBack: () => void
  };

const Settings: FunctionComponent<SettingsProps> = ({settingsConfig, goBack}: SettingsProps) => {
	const [settings, setSettings] = useState<SettingsConfig>(settingsConfig)
	const handleChange = async (event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
		const newValue = event.target.value.toString();
		const newSettings = {...settings, [key]: newValue};
		console.log(newSettings)
		setSettings(newSettings);
	}

	const saveSettings = async () => {
		await chrome.storage.local.set({ settings });
		goBack()
	}

	const buttonStyle = {
		position: 'absolute',
		top: '-25px',
		right: '25px',
		backgroundColor: '#536DFE',
		zIndex: 3
	}

	return (
		<Box sx={{ width: '100%', maxWidth: 375, bgcolor: 'background.paper' }} >
			    <div>
				<div style={{position: 'relative'}}>
					<IconButton aria-label="Back" onClick={() => saveSettings()} style={buttonStyle} sx={{ boxShadow: 3 }} >
						<ArrowBackIcon style={{color: 'white'}} />
					</IconButton>
				</div>
				<FormControl sx={{ m: 1, minWidth: 80 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Range</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={settings.range}
						onChange={(e) => handleChange(e, 'range')}
						autoWidth
						label="Range"
					>
						<MenuItem value={12}>12h</MenuItem>
						<MenuItem value={24}>24h</MenuItem>
						<MenuItem value={48}>48h</MenuItem>
					</Select>
					<TextField
						type="text"
						label="Excluded"
						variant="outlined"
						value={settings.excludeList}
						defaultValue={settingsConfig.excludeList}
						onChange={(e) => handleChange(e, 'excludeList')}
					/>
				</FormControl>
			</div>
		</Box>
	)
}

export default Settings;