import Button from 'components/Button';
import {ButtonProps} from 'components/Button/Button';
import ConfirmDialog from 'components/ConfirmDialog';
import Typography from 'components/Typography';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';

const LogoutButton = (props: ButtonProps) => {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModel = useCallback(() => {
		setShowModal(true);
	}, []);

	const handleCloseModel = useCallback(() => {
		setShowModal(false);
	}, []);

	const handleOkPress = useCallback(() => {
		auth().signOut();
		handleCloseModel();
	}, [handleCloseModel]);

	return (
		<>
			<ConfirmDialog
				isVisible={showModal}
				okText="Logout"
				cancelText="No"
				onOk={handleOkPress}
				onCancel={handleCloseModel}>
				<Typography h3 style={{color: 'white'}}>
					Are you sure that you want to sign out ?
				</Typography>
			</ConfirmDialog>
			<Button text={'Logout'} onPress={handleOpenModel} {...props} />
		</>
	);
};

export default LogoutButton;
