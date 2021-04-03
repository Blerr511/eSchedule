import {StackNavigationProp} from '@react-navigation/stack';
import Button from 'components/Button/Button';
import TextField from 'components/TextField';
import {createStyleSheet, useTheme} from 'hooks/useTheme';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Pressable, Text, View} from 'react-native';
import {RootStackParamList} from 'Views';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import {useControlledInput} from 'hooks';
import {RootState} from 'store/store';

const useStyles = createStyleSheet(theme => ({
	container: {
		flex: 1,
		display: 'flex',
		position: 'relative',
		paddingHorizontal: theme.spacing(2),
		paddingVertical: theme.spacing(4),
		backgroundColor: theme.pallet.background.primary,
		minHeight: 450
	},
	headerContainer: {
		paddingBottom: theme.spacing(4)
	},
	subTitle: {
		fontSize: theme.typography.fontSize.small,
		color: theme.typography.color.tertiary
	},
	title: {
		fontSize: theme.typography.fontSize.extraLarge,
		color: theme.typography.color.primary,
		fontWeight: 'bold'
	},
	input: {
		color: theme.pallet.primary
	},
	removePadding: {
		paddingHorizontal: 0
	},
	togglePasswordVisibility: {
		position: 'relative',
		right: 10
	},
	formContainer: {flex: 1, display: 'flex', justifyContent: 'center'},
	forgotPassword: {
		color: theme.pallet.primary,
		textAlign: 'right'
	}
}));

export interface SignInProps {
	navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignIn: React.FC<SignInProps> = () => {
	const dispatch = useDispatch();

	const styles = useStyles();
	const theme = useTheme();

	const {
		user,
		loggedIn,
		error,
		loading,
		meta: {email: emailError, password: passwordError}
	} = useSelector((state: RootState) => state.auth);

	const [email, onEmailChange] = useControlledInput();
	const [password, onPasswordChange] = useControlledInput();

	const [showPassword, setShowPassword] = useState(false);

	const $password = useRef<Input>(null);

	const handleTogglePassword = useCallback(() => setShowPassword(v => !v), []);

	const handleSubmit = useCallback(() => {
		if (email && password) dispatch(actions.auth.signIn({email, password}));
	}, [dispatch, email, password]);
	console.log({user, loggedIn, error, loading});
	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>Welcome</Text>
				<Text style={styles.subTitle}>Sign In to continue</Text>
			</View>
			<View style={[styles.formContainer, {opacity: loading ? 0.5 : 1}]}>
				<View>
					<TextField
						label="Email"
						leftIcon={<Icon name="user" size={24} color={theme.pallet.primary} />}
						containerStyle={styles.removePadding}
						inputStyle={styles.input}
						textContentType="emailAddress"
						returnKeyType="next"
						onSubmitEditing={() => $password.current?.focus()}
						onChangeText={onEmailChange}
						value={email}
						keyboardType="email-address"
						errorMessage={emailError}
						disabled={loading}
					/>
				</View>
				<View>
					<TextField
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
						returnKeyType="done"
						onSubmitEditing={handleSubmit}
						value={password}
						onChangeText={onPasswordChange}
						errorMessage={passwordError}
						disabled={loading}
					/>
				</View>
				<Text style={styles.forgotPassword}>Forgot Password?</Text>
			</View>
			<Button text="Sign In" disabled={loading} onPress={handleSubmit} activeOpacity={0.8} />
		</View>
	);
};

export default SignIn;
