import {RTDatabase} from 'helpers/firebase';
import {usePipedStateById} from 'hooks';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {IUser} from 'store/slices/auth';

export interface ProfileHeaderProps {
	user: IUser<'student'>;
}

const facultyController = new RTDatabase().faculty;

const FacultyItem = ({user}: ProfileHeaderProps) => {
	const [faculty] = usePipedStateById(facultyController, user.settings?.facultyId);

	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Subtitle>Faculty</ListItem.Subtitle>
				<ListItem.Title>{faculty?.longTitle || faculty?.title}</ListItem.Title>
			</ListItem.Content>
		</ListItem>
	);
};

export default FacultyItem;
