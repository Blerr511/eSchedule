import React from 'react';
import Typography from 'components/Typography';
import {createStyleSheet} from 'hooks';
import {ListItem, Avatar} from 'react-native-elements';
import {IUser} from 'store/slices/auth';

const useStyles = createStyleSheet(theme => ({
	accessory: {
		backgroundColor: theme.pallet.primary
	},
	avatarTitle: {
		color: 'black'
	},
	avatarContainer: {
		backgroundColor: `${theme.pallet.primary}30`
	}
}));

export interface ProfileHeaderProps {
	user: IUser;
}

const ProfileHeader = ({user}: ProfileHeaderProps) => {
	const styles = useStyles();

	return (
		<ListItem bottomDivider>
			<Avatar
				rounded
				size="large"
				title={user.email?.slice(0, 2)}
				titleStyle={styles.avatarTitle}
				containerStyle={styles.avatarContainer}>
				<Avatar.Accessory size={24} style={styles.accessory} />
			</Avatar>
			<ListItem.Content>
				<ListItem.Title>
					<Typography h2 style={{textAlign: 'left'}}>
						{user.displayName || user.email.split('@')[0]}
					</Typography>
				</ListItem.Title>
				<ListItem.Subtitle>{user.email}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default ProfileHeader;
