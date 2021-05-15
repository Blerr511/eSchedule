import Typography from 'components/Typography';
import {createStyleSheet} from 'hooks';
import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-elements';
import {Card} from 'react-native-paper';

const useStyles = createStyleSheet(theme => ({
	headerCard: {
		padding: theme.spacing(1)
	}
}));

export interface HeaderProps {
	children?: string | ReactNode;
}

const Header = ({children}: HeaderProps) => {
	const styles = useStyles();

	return (
		<View>
			<Card style={styles.headerCard}>
				<Typography h1 alignCenter>
					{children}
				</Typography>
			</Card>
			<Divider />
		</View>
	);
};

export default Header;
