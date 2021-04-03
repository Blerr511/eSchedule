import {createContext, Dispatch, SetStateAction} from 'react';
import {ITheme} from './interfaces';

export const defaultTheme: ITheme = {
	pallet: {
		background: {
			white: '#ffffff',
			black: '#000000'
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
