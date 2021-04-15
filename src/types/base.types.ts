export interface BaseRequestReducer<M> {
	loading: boolean;
	error: string | null;
	message: string | null;
	meta: M;
}

export interface BaseMeta<K extends string = any> {
	code: K;
	message: string;
}
