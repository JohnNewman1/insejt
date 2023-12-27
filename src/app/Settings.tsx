import { h,  FunctionComponent } from "preact";
import { useState } from 'preact/hooks';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from "@mui/material";
import { SettingsConfig } from "./types";

type SettingsProps = {
	settingsConfig: SettingsConfig;
  };

const Settings: FunctionComponent<SettingsProps> = ({settingsConfig}: SettingsProps) => {
	const [range, setRange] = useState<string>(settingsConfig.range)
	const handleChange = async (event: SelectChangeEvent<string>) => {
		const newRange = event.target.value.toString();
		await chrome.storage.local.set({ range: newRange })
		setRange(newRange)
	}

	return (
		<Box sx={{ width: '100%', maxWidth: 375, bgcolor: 'background.paper' }} >
			    <div>
				<FormControl sx={{ m: 1, minWidth: 80 }}>
					<InputLabel id="demo-simple-select-autowidth-label">Range</InputLabel>
					<Select
						labelId="demo-simple-select-autowidth-label"
						id="demo-simple-select-autowidth"
						value={range}
						onChange={handleChange}
						autoWidth
						label="Range"
					>
						<MenuItem value={12}>12h</MenuItem>
						<MenuItem value={24}>24h</MenuItem>
						<MenuItem value={48}>48h</MenuItem>
					</Select>
				</FormControl>
			</div>
		</Box>
	)
}

export default Settings;