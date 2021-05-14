import {RTDatabase} from 'helpers/firebase';
import {usePipedStateById} from 'hooks';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {IUser} from 'store/slices/auth';

export interface GroupItemProps {
	user: IUser<'student'>;
}

const groupController = new RTDatabase().group;

const GroupItem = ({user}: GroupItemProps) => {
	const group = usePipedStateById(groupController, user.settings?.groupId);

	return (
		<ListItem bottomDivider>
			<ListItem.Content>
				<ListItem.Subtitle>Group</ListItem.Subtitle>
				<ListItem.Title>{group?.title}</ListItem.Title>
			</ListItem.Content>
		</ListItem>
	);
};

export default GroupItem;
