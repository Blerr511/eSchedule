import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {IRole} from 'store/slices/auth';
import {RootState} from 'store/store';

export const useHasRole = (role: IRole) => {
	const userRole = useSelector((state: RootState) => auth.userInfo(state)?.role);
	return role === userRole;
};
