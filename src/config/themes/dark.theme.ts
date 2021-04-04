import {createTheme} from 'hooks/useTheme/ThemeProvider';

export const dark = createTheme({
	pallet: {
		background: {
			primary: '#000000',
			secondary: '#ffffff',
			tertiary: '#4B4B4C'
		},
		primary: '#2ba97a'
	},
	typography: {
		color: {
			primary: '#ffffff',
			secondary: '#000000',
			tertiary: '#BBBCB6'
		}
	}
});
