import React from 'react';
import {usePipedStateById} from 'hooks';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors/auth';
import {Card} from 'react-native-elements';
import {RTDatabase} from 'helpers/firebase';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import Loading from 'components/Loading';
import Typography from 'components/Typography';
import ProfileHeader from 'components/ProfileHeader';
import PushNotificationsItem from 'components/PushNotificationsItem';
import LogoutButton from 'components/LogoutButton';

const userController = new RTDatabase().users;

const LecturerSettings = () => {
	const storeUser = useSelector(auth.user);

	const [user] = usePipedStateById(userController, storeUser?.uid);

	return (
		<KeyboardAvoidingView style={{flex: 1}}>
			<ScrollView>
				<Card>
					<Card.Title>
						<Typography h4>Profile Settings</Typography>
					</Card.Title>
					<Card.Divider />
					{!user ? (
						<Loading />
					) : (
						<View>
							<ProfileHeader user={user} />
							<PushNotificationsItem user={user} />
							<LogoutButton />
						</View>
					)}
				</Card>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default LecturerSettings;
