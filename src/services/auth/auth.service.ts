export interface LoginPayload {
	username: string;
	password: string;
}
export const Login = ({username, password}: LoginPayload) =>
	new Promise(res => {
		console.log({username, password});
		setTimeout(res, 1000, {username: 'Test', name: 'test', surname: 'test', type: 'lec'});
	});
