import {useCallback, useState} from 'react';
import {useDatabaseListener, DataListenerCb} from './useDatabaseListener';

export const useRealTimeData = <T = unknown>(ref: string) => {
	const [state, setState] = useState<T | null>(null);

	const handleDataChange: DataListenerCb = useCallback(snap => {
		setState(snap.val() as T | null);
	}, []);

	useDatabaseListener({ref, event: 'value'}, handleDataChange);

	return state;
};
