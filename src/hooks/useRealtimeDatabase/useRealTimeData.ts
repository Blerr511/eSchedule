import {useCallback, useEffect, useRef, useState} from 'react';
import {useDatabaseListener, DataListenerCb} from './useDatabaseListener';

export interface DataBaseItem {
	[key: string]: string | number | boolean | null | undefined | DataBaseItem;
}

export const useRealTimeData = <T extends DataBaseItem = DataBaseItem>(ref: string) => {
	const $mounted = useRef(true);
	const [state, setState] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);

	const handleDataChange: DataListenerCb = useCallback(snap => {
		setState(snap.val() as T | null);
	}, []);

	useEffect(() => {
		$mounted.current = true;
		return () => {
			$mounted.current = false;
		};
	});
	const $ref = useDatabaseListener({ref, event: 'value'}, handleDataChange);

	const handleSetData = useCallback(
		async (data: T) => {
			setLoading(true);
			await $ref.set(data);
			if ($mounted.current) setLoading(false);
		},
		[$ref]
	);

	return [state, loading, handleSetData];
};
