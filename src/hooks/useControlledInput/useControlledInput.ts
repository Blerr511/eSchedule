import {useState, useCallback} from 'react';

export const useControlledInput = <T = any>(initialValue?: T): [T | undefined, (e: any) => void] => {
	const [value, setValue] = useState(initialValue);

	const handleChange = useCallback((e: any) => {
		setValue(e);
	}, []);

	return [value, handleChange];
};
