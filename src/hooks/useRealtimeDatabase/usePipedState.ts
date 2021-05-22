import {BaseController, DBItem, DBItemPayload} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {useCallback, useEffect, useState} from 'react';

export const usePipedState = <T extends DBItem = DBItem>(
	controller: BaseController<T>,
	filter?: (user: T) => boolean
): [T[] | null | undefined, (uid: DBItem['uid'], data: Partial<DBItemPayload<T>>) => Promise<void>] => {
	const [state, setState] = useState<T[] | null>();

	const update = useCallback(
		(uid: DBItem['uid'], data: Partial<DBItemPayload<T>>) => {
			return controller.updateById(uid, data);
		},
		[controller]
	);

	useEffect(() => {
		const unsubscribe = controller.pipe(setState, filter);

		return () => {
			unsubscribe();
		};
	}, [controller, filter]);

	return [state, update];
};
