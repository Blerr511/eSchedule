import {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import themeContext from './context';
import {ITheme} from './interfaces';

type NamedStyles<T = any> = StyleSheet.NamedStyles<T>;
// eslint-disable-next-line no-unused-vars
type NamedStylesReturn<T = any> = (theme: ITheme) => NamedStyles<T>;

export const createStyleSheet = <T>(
	styles: NamedStyles<T> | NamedStylesReturn<T>
): (() => NamedStyles<T>) => {
	const useTheme = () => {
		const ctx = useContext(themeContext);
		return useMemo(() => {
			if (typeof styles === 'function') return styles(ctx.theme);
			else return styles;
		}, [ctx.theme]);
	};

	if (typeof styles === 'object') return () => styles;
	else if (typeof styles === 'function') return useTheme;
	else throw new Error('Styles provided to useTheme is not function or object');
};
