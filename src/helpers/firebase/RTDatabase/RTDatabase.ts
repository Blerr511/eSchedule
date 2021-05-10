import app from '../app';
import {FacultyController} from './controllers/Faculty';
import {GroupController} from './controllers/GroupController.ts';
import {LessonController} from './controllers/LessonController';
import {UsersController} from './controllers/UsersController';

export class RTDatabase {
	private db;
	constructor() {
		this.db = app().database();
	}

	public get users() {
		return new UsersController(this.db);
	}

	public get faculty() {
		return new FacultyController(this.db);
	}

	public get group() {
		return new GroupController(this.db);
	}

	public get lesson() {
		return new LessonController(this.db);
	}
}
