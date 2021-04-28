import Button from 'components/Button';
import {createStyleSheet} from 'hooks';
import React from 'react';
import {Text, View} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';

const useModalStyles = createStyleSheet(theme => ({
	container: {
		backgroundColor: theme.pallet.background.primary,
		padding: theme.spacing(3)
	},
	text: {
		color: theme.typography.color.primary,
		fontSize: theme.typography.fontSize.medium
	},
	buttonsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingTop: theme.spacing(3),
		paddingHorizontal: theme.spacing(2)
	},
	okBtn: {
		paddingVertical: theme.spacing(0.5),
		paddingHorizontal: theme.spacing(2),
		marginLeft: 20
	},
	title: {
		color: theme.typography.color.primary,
		fontSize: theme.typography.fontSize.large,
		fontWeight: 'bold',
		marginBottom: theme.spacing(1)
	}
}));

export interface ConfirmDialogProps extends Partial<ModalProps> {
	onOk?: () => void;
	onCancel?: () => void;
	okText?: string;
	cancelText?: string;
	title?: string;
	cancelButton?: boolean;
	content?: string;
}

const ConfirmDialog = ({
	cancelButton = true,
	okText = 'OK',
	cancelText = 'Cancel',
	onCancel,
	onOk,
	title,
	useNativeDriver = true,
	useNativeDriverForBackdrop = true,
	onBackButtonPress,
	onBackdropPress,
	children,
	content,
	...rest
}: ConfirmDialogProps) => {
	const modalStyles = useModalStyles();
	console.log(modalStyles);
	return (
		<Modal
			useNativeDriver={useNativeDriver}
			useNativeDriverForBackdrop={useNativeDriverForBackdrop}
			renderToHardwareTextureAndroid
			onBackButtonPress={onBackButtonPress ?? onCancel}
			onBackdropPress={onBackdropPress ?? onCancel}
			{...rest}>
			<View style={modalStyles.container}>
				{!!title && <Text style={modalStyles.title}>{title}</Text>}
				{!!content && <Text style={modalStyles.text}>{content}</Text>}
				{children}
				<View style={modalStyles.buttonsContainer}>
					{cancelButton && (
						<Button
							text={cancelText}
							type="bordered"
							style={modalStyles.okBtn}
							onPress={onCancel}
						/>
					)}
					<Button text={okText} type="bordered" style={modalStyles.okBtn} onPress={onOk} />
				</View>
			</View>
		</Modal>
	);
};

export default ConfirmDialog;
