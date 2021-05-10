import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';
import {useRealTimeData} from 'hooks/useRealtimeDatabase';
import {IUser} from 'store/slices/auth';
import {RootState} from 'store/store';

export const useRole = () => {
	const userId = useSelector((state: RootState) => auth.user(state)?.uid);
	const [info] = useRealTimeData<IUser>(`/users/${userId}`);
	return info?.role;
};
