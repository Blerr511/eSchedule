import {createStyleSheet} from 'hooks';

const useSignScreenStyles = createStyleSheet(theme => ({
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
	},
	text: {
		fontSize: theme.typography.fontSize.small,
		color: theme.typography.color.primary
	},
	link: {
		fontSize: theme.typography.fontSize.small,
		color: theme.pallet.primary
	},
	signUpContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: theme.spacing(2)
	}
}));

export default useSignScreenStyles;
