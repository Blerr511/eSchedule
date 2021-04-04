import {StackNavigationProp} from '@react-navigation/stack';
import Button from 'components/Button/Button';
import TextField from 'components/TextField';
import {useTheme} from 'hooks/useTheme';
import React, {useCallback, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {RootStackParamList} from 'Views';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import actions from 'store/actions';
import {useControlledInput} from 'hooks';
import {RootState} from 'store/store';
import useSignScreenStyles from '../styles';
import authSlice from 'store/slices/auth';

export interface SignInProps {
	navigation: StackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignIn = ({navigation}: SignInProps) => {
	const dispatch = useDispatch();

	const styles = useSignScreenStyles();
	const theme = useTheme();

	const {
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

	const handleSignUp = useCallback(() => {
		navigation.navigate('SignUp');
		dispatch(authSlice.actions.clearErrors());
	}, [dispatch, navigation]);

	const disableSignIn = loading || !email || !password;

	return (
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
						errorMessage={emailError}
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
			<Button text="Sign In" disabled={disableSignIn} onPress={handleSubmit} activeOpacity={0.8} />
			<View style={styles.signUpContainer}>
				<Text style={styles.text}>{"Don't have account?"}</Text>
				<Pressable hitSlop={{bottom: 10, top: 10, left: 20, right: 20}} onPress={handleSignUp}>
					<Text style={[styles.link, {paddingLeft: 5}]}>create a new account</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default SignIn;
