import {createContext, Dispatch, SetStateAction} from 'react';
import {ITheme, IThemeGetter} from './interfaces';

export const defaultTheme: ITheme & IThemeGetter = {
	pallet: {
		background: {
			primary: '#ffffff',
			secondary: '#000000'
		},
		border: {
			primary: '#ffffff',
			secondary: '#000000'
		}
	},
	typography: {
		color: {
			primary: '#000000',
			secondary: 'gray'
		},
		fontSize: {
			medium: 12
		}
	},
	space: 8,
	spacing(space) {
		return this.space * space;
	}
};

const themeContext = createContext<{
	theme: ITheme;
	currentTheme?: string | number;
	setCurrentTheme?: Dispatch<SetStateAction<string | number>>;
}>({
	theme: defaultTheme
});

themeContext.displayName = 'ThemeContext';

export default themeContext;
