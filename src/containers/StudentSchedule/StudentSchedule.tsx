import Table from 'components/Table';
import Typography from 'components/Typography';
import React from 'react';
import {KeyboardAvoidingView, View} from 'react-native';

const WEEK_DAYS = [
	{
		value: 0,
		label: 'Monday'
	},
	{value: 1, label: 'Tuesday'},
	{value: 2, label: 'Wednesday'},
	{value: 3, label: 'Thursday'},
	{value: 4, label: 'Friday'},
	{
		value: 5,
		label: 'Saturday'
	}
];

const StudentSchedule = () => {
	return (
		<KeyboardAvoidingView style={{flex: 1}}>
			<Typography>Student</Typography>
			<View style={{height: '100%'}}>
				<Table>
					<Table.Row>
						<Table.Column>
							<Typography>H1</Typography>
						</Table.Column>
					</Table.Row>
				</Table>
			</View>
		</KeyboardAvoidingView>
	);
};

export default StudentSchedule;
