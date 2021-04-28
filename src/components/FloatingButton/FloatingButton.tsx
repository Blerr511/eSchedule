import {createStyleSheet, useTheme} from 'hooks';
import React, {useCallback, useState} from 'react';
import {FAB} from 'react-native-paper';

const useStyles = createStyleSheet(theme => ({
	fab: {
		backgroundColor: theme.pallet.background.primary
	}
}));

export type FloatingButtonProps = Omit<React.ComponentProps<typeof FAB.Group>, 'open' | 'onStateChange'> & {
	activeIcon?: string;
};

const FloatingButton = ({icon = 'plus', activeIcon = 'minus', ...props}: FloatingButtonProps) => {
	const theme = useTheme();
	const styles = useStyles();
	const [open, setOpen] = useState(false);
	const handleStateChange = useCallback(({open}: {open: boolean}) => {
		setOpen(open);
	}, []);

	return (
		<FAB.Group
			open={open}
			fabStyle={styles.fab}
			color={theme.pallet.primary}
			icon={open ? activeIcon : icon}
			onStateChange={handleStateChange}
			{...props}
		/>
	);
};

export default FloatingButton;
