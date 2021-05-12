import {BaseController, DBItem} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {useEffect, useState} from 'react';

export const usePipedState = <T extends DBItem = DBItem>(
	controller: BaseController<T>,
	filter?: (user: T) => boolean
): T[] | null | undefined => {
	const [state, setState] = useState<T[] | null>();

	useEffect(() => {
		const unsubscribe = controller.pipe(setState, filter);

		return () => {
			unsubscribe();
		};
	}, [controller, filter]);

	return state;
};
