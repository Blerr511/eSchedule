import {createTheme} from 'hooks/useTheme/ThemeProvider';

export const light = createTheme({
	pallet: {
		background: {
			primary: '#ffffff',
			secondary: '#000000',
			tertiary: '#FAFAFA'
		},
		primary: '#2ba97a',
		secondary: '#82c5ab',
		tertiary: '#747c74'
	},
	typography: {
		color: {
			primary: '#000000',
			secondary: '#ffffff'
		}
	},
	isDark: false
});
