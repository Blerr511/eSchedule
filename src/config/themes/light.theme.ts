import {createTheme} from 'hooks/useTheme/ThemeProvider';

export const light = createTheme({
	pallet: {
		background: {
			primary: '#ffffff',
			secondary: '#000000',
			tertiary: 'gray'
		}
	},
	typography: {
		color: {
			primary: '#000000',
			secondary: '#ffffff'
		}
	}
});
