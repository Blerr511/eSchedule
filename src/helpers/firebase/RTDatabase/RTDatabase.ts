import app from '../app';
import {UsersController} from './controllers/UsersController';

export class RTDatabase {
	private db;
	constructor() {
		this.db = app().database();
	}

	public get users() {
		return new UsersController(this.db);
	}
}
