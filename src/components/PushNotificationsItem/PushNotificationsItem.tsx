import {useTheme} from 'hooks';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {IUser} from 'store/slices/auth';
import messaging from '@react-native-firebase/messaging';
import * as database from '@react-native-firebase/database';
import {RTDatabase} from 'helpers/firebase';

export interface PushNotificationsItemProps {
	user: IUser;
}

const PushNotificationsItem = ({user}: PushNotificationsItemProps) => {
	const theme = useTheme();

	const [pushEnabled, setPushEnabled] = useState(false);

	const $ref = useMemo(() => new RTDatabase().users.ref(user.uid, 'settings', 'pushNotifications'), [
		user.uid
	]);

	useEffect(() => {
		if (user.role === 'student' && user.settings?.groupId) {
			const groupId = String(user.settings?.groupId);
			if (pushEnabled) messaging().subscribeToTopic(groupId);
			return () => {
				messaging().unsubscribeFromTopic(groupId);
			};
		} else if (user.role === 'lecturer') {
			messaging().subscribeToTopic(user.uid);
			return () => {
				messaging().unsubscribeFromTopic(user.uid);
			};
		}
	}, [pushEnabled, user.role, user.settings?.groupId, user.uid]);

	useEffect(() => {
		const handler = (data: database.FirebaseDatabaseTypes.DataSnapshot) =>
			setPushEnabled(Boolean(data.val()));

		$ref.on('value', handler);

		return () => {
			$ref.off('value', handler);
		};
	}, [$ref]);

	const handleTogglePush = useCallback(() => {
		$ref.set(!pushEnabled);
	}, [$ref, pushEnabled]);

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
