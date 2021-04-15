import TextField from 'components/TextField';
import {createStyleSheet, useControlledInput, useTheme} from 'hooks';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import useSignScreenStyles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {selectors} from 'store';
import Button from 'components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'Views/types';
import authSlice from 'store/slices/auth';
import Modal from 'react-native-modal';
import actions from 'store/actions';
import {Input} from 'react-native-elements';

const useModalStyles = createStyleSheet(theme => ({
	container: {backgroundColor: theme.pallet.background.tertiary, padding: theme.spacing(3)},
	text: {
		color: theme.typography.color.tertiary,
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
		paddingHorizontal: theme.spacing(2)
	},
	title: {
		color: theme.typography.color.primary,
		fontSize: theme.typography.fontSize.large,
		fontWeight: 'bold',
		marginBottom: theme.spacing(1)
	}
}));

export interface SignUpProps {
	navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignUp = ({navigation}: SignUpProps) => {
	const theme = useTheme();
	const styles = useSignScreenStyles();
	const dispatch = useDispatch();
	const modalStyles = useModalStyles();

	const {
		modalText,
		modalTitle,
		showModal,
		loading,
		meta: {email: emailError, password: passwordError, confirmPassword: confirmPasswordError}
	} = useSelector(selectors.auth.signUp);
	const [email, onEmailChange] = useControlledInput();
	const [password, onPasswordChange] = useControlledInput();
	const [passwordConfirm, onPasswordConfirmChange] = useControlledInput();

	const [showPassword, setShowPassword] = useState(false);
	const handleTogglePassword = useCallback(() => setShowPassword(v => !v), []);

	const $password = useRef<Input>(null);
	const $passwordConfirm = useRef<Input>(null);

	const handleSignIn = useCallback(() => {
		dispatch(authSlice.actions.clearSignUpErrors());
		navigation.navigate('SignIn');
	}, [dispatch, navigation]);

	const handleCloseModal = useCallback(() => dispatch(authSlice.actions.toggleSignUpModal(false)), [
		dispatch
	]);

	const handleModalClosed = useCallback(() => {
		dispatch(authSlice.actions.clearSignUpModal());
		navigation.navigate('SignIn');
	}, [dispatch, navigation]);

	const handleSendEmail = useCallback(() => {
		handleCloseModal();
		dispatch(actions.auth.signUp({email, password, passwordConfirm}));
	}, [dispatch, email, handleCloseModal, password, passwordConfirm]);

	const signUpBtnDisabled = loading;

	useEffect(() => {
		return () => {
			dispatch(authSlice.actions.clearSignUpErrors());
		};
	}, [dispatch]);

	return (
		<View style={[styles.container, {minHeight: 600}]}>
			<Modal
				renderToHardwareTextureAndroid
				useNativeDriver
				useNativeDriverForBackdrop
				isVisible={showModal}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}
				onModalHide={handleModalClosed}>
				<View style={modalStyles.container}>
					<Text style={modalStyles.title}>{modalTitle}</Text>
					<Text style={modalStyles.text}>{modalText}</Text>
					<View style={modalStyles.buttonsContainer}>
						<Button
							text={'Ok'}
							type="bordered"
							style={modalStyles.okBtn}
							onPress={handleCloseModal}
						/>
					</View>
				</View>
			</Modal>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Create Account</Text>
				<Text style={styles.subTitle}>Sign up to get started</Text>
			</View>
			<View style={[styles.formContainer, {opacity: loading ? 0.5 : 1}]}>
				<View>
					<TextField
						placeholder="email@address.com"
						label="Email"
						leftIcon={<Icon name="envelope" size={24} color={theme.pallet.primary} />}
						containerStyle={styles.removePadding}
						inputStyle={styles.input}
						textContentType="emailAddress"
						returnKeyType="done"
						onSubmitEditing={() => $password.current?.focus()}
						onChangeText={onEmailChange}
						value={email}
						keyboardType="email-address"
						errorMessage={emailError || undefined}
						disabled={loading}
					/>
				</View>
				<View>
					<TextField
						placeholder="********"
						label="Password"
						textContentType="password"
						leftIcon={<Icon name="lock" size={24} color={theme.pallet.primary} />}
						ref={$password}
						rightIcon={
							<Pressable onPress={handleTogglePassword} style={styles.togglePasswordVisibility}>
								<Icon
									name={showPassword ? 'eye-slash' : 'eye'}
									size={24}
									color={theme.pallet.primary}
								/>
							</Pressable>
						}
						containerStyle={styles.removePadding}
						inputStyle={styles.input}
						secureTextEntry={!showPassword}
						returnKeyType="next"
						onSubmitEditing={() => $passwordConfirm.current?.focus()}
						value={password}
						onChangeText={onPasswordChange}
						errorMessage={passwordError || undefined}
						disabled={loading}
					/>
				</View>
				<View>
					<TextField
						placeholder="********"
						label="Confirm Password"
						textContentType="password"
						leftIcon={<Icon name="lock" size={24} color={theme.pallet.primary} />}
						ref={$passwordConfirm}
						containerStyle={styles.removePadding}
						inputStyle={styles.input}
						secureTextEntry={!showPassword}
						returnKeyType="done"
						onSubmitEditing={handleSendEmail}
						value={passwordConfirm}
						onChangeText={onPasswordConfirmChange}
						errorMessage={confirmPasswordError || undefined}
						disabled={loading}
					/>
				</View>
			</View>
			<Button
				text="Sign Up"
				disabled={signUpBtnDisabled}
				onPress={handleSendEmail}
				activeOpacity={0.8}
			/>
			<View style={styles.signUpContainer}>
				<Text style={styles.text}>{'Already have account?'}</Text>
				<Pressable hitSlop={{bottom: 10, top: 10, left: 20, right: 20}} onPress={handleSignIn}>
					<Text style={[styles.link, {paddingLeft: 5}]}>{'Sign In'}</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SignUp;
