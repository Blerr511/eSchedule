import {StackNavigationProp} from '@react-navigation/stack';
import Button from 'components/Button/Button';
import TextField from 'components/TextField';
import {createStyleSheet, useTheme} from 'hooks/useTheme';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import {useControlledInput} from 'hooks';
import useSignScreenStyles from '../styles';
import authSlice from 'store/slices/auth';
import ReactNativeModal from 'react-native-modal';
import {SignScreenParamList} from 'Views/types';
import {selectors} from 'store';

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
	},
	textField: {
		marginTop: theme.spacing(1)
	}
}));

export interface SignInProps {
	navigation: StackNavigationProp<SignScreenParamList, 'SignIn'>;
}

const SignIn = ({navigation}: SignInProps) => {
	const dispatch = useDispatch();

	const styles = useSignScreenStyles();
	const theme = useTheme();
	const modalStyles = useModalStyles();

	const {
		loading,
		meta: {email: emailError, password: passwordError},
		error,
		showModal
	} = useSelector(selectors.auth.signIn);

	const {
		error: remindError,
		loading: remindLoading,
		message: remindMessage,
		showModal: remindShowModal
	} = useSelector(selectors.auth.remindPassword);

	const [email, onEmailChange] = useControlledInput();
	const [password, onPasswordChange] = useControlledInput();
	const [remindEmail, onRemindEmailChange] = useControlledInput();

	const [showPassword, setShowPassword] = useState(false);

	const [remindModalState, setRemindModalState] = useState(false);

	const handleCloseModal = () => setRemindModalState(false);
	const handleOpenModal = () => setRemindModalState(true);

	const $password = useRef<Input>(null);

	const handleTogglePassword = useCallback(() => setShowPassword(v => !v), []);

	const handleSubmit = useCallback(() => {
		if (email && password) dispatch(actions.auth.signIn({email, password}));
	}, [dispatch, email, password]);

	const handleSignUp = useCallback(() => {
		navigation.navigate('SignUp');
		dispatch(authSlice.actions.clearSignInErrors());
	}, [dispatch, navigation]);

	const handleRemindPassword = useCallback(() => {
		setRemindModalState(false);
		dispatch(actions.auth.remindPassword({email: remindEmail}));
	}, [dispatch, remindEmail]);

	const handleCloseModalRemindMessage = useCallback(() => {
		dispatch(authSlice.actions.hideRemindModal());
	}, [dispatch]);

	const handleModalRemindMessageClosed = useCallback(() => {
		dispatch(authSlice.actions.clearRemindModalData());
	}, [dispatch]);

	const handleCloseSignInModal = useCallback(() => {
		dispatch(authSlice.actions.hideSignInModal());
	}, [dispatch]);

	const handleSignInModalClosed = useCallback(() => {
		dispatch(authSlice.actions.clearSignInErrors());
	}, [dispatch]);

	const disableSignIn = loading || !email || !password;

	useEffect(() => {
		return () => {
			dispatch(authSlice.actions.clearSignInErrors());
		};
	}, [dispatch]);

	return (
		<>
			<ReactNativeModal
				renderToHardwareTextureAndroid
				useNativeDriver
				useNativeDriverForBackdrop
				isVisible={showModal}
				onBackButtonPress={handleCloseSignInModal}
				onBackdropPress={handleCloseSignInModal}
				onModalHide={handleSignInModalClosed}>
				<View style={modalStyles.container}>
					<Text style={modalStyles.title}>{error}</Text>
					<View style={modalStyles.buttonsContainer}>
						<Button
							text={'Ok'}
							type="bordered"
							style={modalStyles.okBtn}
							onPress={handleCloseSignInModal}
						/>
					</View>
				</View>
			</ReactNativeModal>
			<ReactNativeModal
				renderToHardwareTextureAndroid
				useNativeDriver
				useNativeDriverForBackdrop
				isVisible={remindShowModal}
				onBackButtonPress={handleCloseModalRemindMessage}
				onBackdropPress={handleCloseModalRemindMessage}
				onModalHide={handleModalRemindMessageClosed}>
				<View style={modalStyles.container}>
					<Text style={modalStyles.title}>{remindMessage || remindError}</Text>
					<View style={modalStyles.buttonsContainer}>
						<Button
							text={'Ok'}
							type="bordered"
							style={modalStyles.okBtn}
							onPress={handleCloseModalRemindMessage}
						/>
					</View>
				</View>
			</ReactNativeModal>
			<ReactNativeModal
				renderToHardwareTextureAndroid
				useNativeDriver
				useNativeDriverForBackdrop
				isVisible={remindModalState}
				onBackButtonPress={handleCloseModal}
				onBackdropPress={handleCloseModal}>
				<View style={modalStyles.container}>
					<Text style={modalStyles.title}>{'Please enter your email address'}</Text>
					<View style={modalStyles.textField}>
						<TextField label="email" value={remindEmail} onChangeText={onRemindEmailChange} />
					</View>
					<View style={modalStyles.buttonsContainer}>
						<Button
							text={'Send'}
							type="bordered"
							style={modalStyles.okBtn}
							onPress={handleRemindPassword}
							disabled={!remindEmail || remindLoading}
						/>
					</View>
				</View>
			</ReactNativeModal>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Welcome</Text>
					<Text style={styles.subTitle}>Sign In to continue</Text>
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
							returnKeyType="next"
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
								<Pressable
									onPress={handleTogglePassword}
									style={styles.togglePasswordVisibility}>
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
							returnKeyType="done"
							onSubmitEditing={handleSubmit}
							value={password}
							onChangeText={onPasswordChange}
							errorMessage={passwordError || undefined}
							disabled={loading}
						/>
					</View>
					<Pressable onPress={handleOpenModal}>
						<Text style={styles.forgotPassword}>Forgot Password?</Text>
					</Pressable>
				</View>
				<Button text="Sign In" disabled={disableSignIn} onPress={handleSubmit} activeOpacity={0.8} />
				<View style={styles.signUpContainer}>
					<Text style={styles.text}>{"Don't have account?"}</Text>
					<Pressable hitSlop={{bottom: 10, top: 10, left: 20, right: 20}} onPress={handleSignUp}>
						<Text style={[styles.link, {paddingLeft: 5}]}>create a new account</Text>
					</Pressable>
				</View>
			</View>
		</>
	);
};

export default SignIn;
