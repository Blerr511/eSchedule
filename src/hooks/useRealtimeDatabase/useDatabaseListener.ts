import db, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import app from 'helpers/firebase';
import {useEffect, useMemo, useRef} from 'react';

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

	const _ref = useMemo(() => db(app()).ref(ref), [ref]);

	useEffect(() => {
		$cb.current = callBack;
	}, [callBack]);

	useEffect(() => {
		if (!options?.disable) _ref.on(event, $cb.current);

		return () => {
			_ref.off(event, $cb.current);
		};
	}, [_ref, event, options?.disable]);

	return _ref;
};
