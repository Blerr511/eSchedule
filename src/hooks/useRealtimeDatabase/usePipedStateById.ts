import {BaseController, DBItem, DBItemPayload} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {useCallback, useEffect, useState} from 'react';

export const usePipedStateById = <T extends DBItem = DBItem>(
	controller: BaseController<T>,
	id?: string
): [T | null | undefined, (data: Partial<DBItemPayload<T>>) => Promise<void>] => {
	const [state, setState] = useState<T | null>();

	const update = useCallback(
		async (data: Partial<DBItemPayload<T>>): Promise<void> => {
			if (id) await controller.updateById(id, data);
			else if (__DEV__) console.warn('You trying update db item with id - undefined ');
		},
		[controller, id]
	);

	useEffect(() => {
		if (id) {
			const unsubscribe = controller.pipeById(id, setState);

			return () => {
				unsubscribe();
			};
		}
	}, [controller, id]);

	return [state, update];
};
