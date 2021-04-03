import {createTheme} from 'hooks/useTheme/ThemeProvider';

export const dark = createTheme({
	pallet: {
		background: {
			primary: '#000000',
			secondary: '#ffffff',
			tertiary: 'gray'
		}
	},
	typography: {
		color: {
			primary: '#ffffff',
			secondary: '#000000'
		}
	}
});
