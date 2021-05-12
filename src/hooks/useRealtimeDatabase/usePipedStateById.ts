import {BaseController, DBItem} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {useEffect, useState} from 'react';

export const usePipedStateById = <T extends DBItem = DBItem>(
	controller: BaseController<T>,
	id: string
): T | null | undefined => {
	const [state, setState] = useState<T | null>();

	useEffect(() => {
		const unsubscribe = controller.pipeById(id, setState);

		return () => {
			unsubscribe();
		};
	}, [controller, id]);

	return state;
};
