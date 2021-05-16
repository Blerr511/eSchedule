import ConfirmDialog from 'components/ConfirmDialog';
import React from 'react';
import {Linking, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {hideNotificationPopup} from 'store/actions/firebase';
import {firebaseSelector} from 'store/selectors/firebase';

const FirebasePopup = () => {
	const {body, showPopup, title, cancelText = 'Ok', linking, okText = 'Show'} = useSelector(
		firebaseSelector
	);

	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(hideNotificationPopup());
	};

	const handleOk = () => {
		if (linking) {
			Linking.openURL(linking).catch(err => {
				if (err?.message) ToastAndroid.show(err?.message, 3000);
			});
		}
		handleClose();
	};

	return (
		<ConfirmDialog
			isVisible={showPopup}
			title={title || ''}
			content={body || ''}
			onOk={handleOk}
			onCancel={handleClose}
			cancelText={cancelText}
			okText={okText}
			okButton={!!linking}
		/>
	);
};

export default FirebasePopup;
