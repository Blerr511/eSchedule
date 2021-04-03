import {createTheme} from 'hooks/useTheme/ThemeProvider';

export const light = createTheme({
	pallet: {
		background: {
			primary: '#ffffff'
		}
	},
	typography: {
		color: {
			primary: '#000000',
			secondary: '#ffffff'
		}
	}
});
