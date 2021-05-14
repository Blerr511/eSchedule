import React from 'react';
import {usePipedStateById} from 'hooks';
import {useSelector} from 'react-redux';
import {IUser} from 'store/slices/auth';
import {auth} from 'store/selectors/auth';
import {Card} from 'react-native-elements';
import {RTDatabase} from 'helpers/firebase';
import {ScrollView, View} from 'react-native';
import Loading from 'components/Loading';
import Typography from 'components/Typography';
import GroupItem from './components/GroupItem';
import FacultyItem from './components/FacultyItem';
import ProfileHeader from './components/ProfileHeader';

const userController = new RTDatabase().users;

const StudentSettings = () => {
	const storeUser = useSelector(auth.user);

	const user = usePipedStateById(userController, storeUser?.uid) as IUser<'student'>;

	return (
		<ScrollView style={{flex: 1}}>
			<Card>
				<Card.Title>
					<Typography h4>Student Profile Settings</Typography>
				</Card.Title>
				<Card.Divider />
				{!user ? (
					<Loading />
				) : (
					<View>
						<ProfileHeader user={user} />
						<FacultyItem user={user} />
						<GroupItem user={user} />
					</View>
				)}
			</Card>
		</ScrollView>
	);
};

export default StudentSettings;
