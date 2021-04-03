import {createContext, Dispatch, SetStateAction} from 'react';
import {ITheme, IThemeGetter, IThemeSetter} from './interfaces';

export const defaultTheme: ITheme & IThemeGetter & IThemeSetter = {
	pallet: {
		background: {
			primary: '#ffffff',
			secondary: '#000000',
			tertiary: 'gray'
		},
		border: {
			primary: '#ffffff',
			secondary: '#000000',
			tertiary: 'gray'
		},
		primary: 'blue',
		secondary: 'red',
		tertiary: 'green'
	},
	typography: {
		color: {
			primary: '#000000',
			secondary: '#ffffff',
			tertiary: 'gray'
		},
		fontSize: {
			extraSmall: 8,
			small: 12,
			medium: 16,
			large: 20,
			extraLarge: 24
		}
	},
	shape: {borderRadius: 5},
	space: 8,
	spacing(space) {
		return this.space * space;
	}
};

const themeContext = createContext<{
	theme: ITheme & IThemeGetter & IThemeSetter;
	currentTheme?: string | number;
	setCurrentTheme?: Dispatch<SetStateAction<string | number>>;
}>({
	theme: defaultTheme
});

themeContext.displayName = 'ThemeContext';

export default themeContext;
