import {useRole} from 'hooks/useRole';
import {IRole} from 'store/slices/auth';

export const useHasRole = (role: IRole) => {
	return useRole() === role;
};
