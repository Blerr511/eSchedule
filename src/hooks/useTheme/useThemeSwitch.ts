import {useContext} from 'react';
import themeContext from './context';

export const useThemeSwitch = () => {
	const context = useContext(themeContext);
	if (!context) throw new Error('useThemeSwitch used outside ThemeProvider');
	return [context.currentTheme, context.setCurrentTheme];
};
