import {useContext, useMemo} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import merge from 'ts-deepmerge';
import themeContext from './context';
import {ITheme, IThemeGetter} from './interfaces';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle}; // eslint-disable-next-line no-unused-vars

type ThemeFactory<T> = (theme: ITheme & IThemeGetter) => T | NamedStyles<T>;

export const createStyleSheet = <T extends NamedStyles<T> = NamedStyles<unknown>>(
	styles: T | NamedStyles<T> | ThemeFactory<T>
	// eslint-disable-next-line no-unused-vars
): ((extraTheme?: ITheme & IThemeGetter) => NamedStyles<T>) => {
	const useTheme = (extraTheme?: ITheme & IThemeGetter) => {
		const ctx = useContext(themeContext);
		return useMemo(() => {
			if (typeof styles === 'function')
				return styles(extraTheme ? merge(ctx.theme, extraTheme) : ctx.theme);
			else return styles;
		}, [ctx.theme, extraTheme]);
	};

	if (typeof styles === 'object') return () => styles;
	else if (typeof styles === 'function') return useTheme;
	else throw new Error('Styles provided to useTheme is not function or object');
};

export const useTheme = () => useContext(themeContext).theme;
