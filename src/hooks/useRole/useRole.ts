import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {RootState} from 'store/store';

export const useRole = () => {
	const userRole = useSelector((state: RootState) => auth.userInfo(state)?.role);
	return userRole;
};
