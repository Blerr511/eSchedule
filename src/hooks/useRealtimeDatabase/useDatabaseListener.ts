import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {useEffect, useRef} from 'react';

export type DataListenerCb = (
	data: FirebaseDatabaseTypes.DataSnapshot,
	previousChildKey?: string | null | undefined
) => void;
export type DatabaseListenerParams = {ref: string; event: FirebaseDatabaseTypes.EventType};
export type DatabaseListenerOptions = {disable?: boolean};

export const useDatabaseListener = (
	{ref, event}: DatabaseListenerParams,
	callBack: DataListenerCb,
	options?: DatabaseListenerOptions
) => {
	const $cb = useRef(callBack);

	useEffect(() => {
		$cb.current = callBack;
	}, [callBack]);

	useEffect(() => {
		if (!options?.disable) database().ref(ref).on(event, $cb.current);

		return () => {
			database().ref(ref).off(event, $cb.current);
		};
	}, [event, options?.disable, ref]);
};
