import {RTDatabase} from 'helpers/firebase';
import {useTheme} from 'hooks';
import React, {useCallback} from 'react';
import {ListItem} from 'react-native-elements';
import {IUser} from 'store/slices/auth';

export interface PushNotificationsItemProps {
	user: IUser<'student'>;
}

const PushNotificationsItem = ({user}: PushNotificationsItemProps) => {
	const theme = useTheme();

	const pushEnabled = Boolean(user.settings?.pushNotifications);

	const handleTogglePush = useCallback(() => {
		new RTDatabase().users.ref(user.uid, 'settings').update({pushNotifications: !pushEnabled});
	}, [pushEnabled, user.uid]);

	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Title>Enable Push notifications</ListItem.Title>
			</ListItem.Content>
			<ListItem.CheckBox
				checked={pushEnabled}
				onPress={handleTogglePush}
				checkedColor={theme.pallet.primary}
			/>
		</ListItem>
	);
};

export default PushNotificationsItem;
