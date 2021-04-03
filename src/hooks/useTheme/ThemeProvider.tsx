import React, {useState} from 'react';
import merge from 'ts-deepmerge';
import {ITheme, CreateThemeProps} from './interfaces';
import themeContext, {defaultTheme} from './context';

export const createTheme = (theme: CreateThemeProps): ITheme => merge(defaultTheme, theme);

const defaultThemeList = {default: defaultTheme};

type ThemeList = {
	[key: string]: ITheme;
};

export interface ThemeProviderProps {
	themes?: ThemeList;
	defaultTheme?: string;
}

const ThemeProvider = ({
	children,
	themes = defaultThemeList,
	defaultTheme = 'default'
}: React.PropsWithChildren<ThemeProviderProps>) => {
	const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>(defaultTheme);

	return (
		<themeContext.Provider value={{theme: themes[currentTheme], currentTheme, setCurrentTheme}}>
			{children}
		</themeContext.Provider>
	);
};

export default ThemeProvider;
