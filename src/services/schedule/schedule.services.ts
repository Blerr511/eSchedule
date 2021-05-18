import axiosClient from 'helpers/axiosClient';
import {DefaultResponse} from 'helpers/axiosClient/axiosClient';
import {DBItemPayload} from 'helpers/firebase/RTDatabase/BaseController.abstract';
import {ISchedule} from 'helpers/firebase/RTDatabase/controllers/ScheduleController';

export const createSchedule = (schedule: DBItemPayload<ISchedule>) =>
	axiosClient.post<DefaultResponse>('/schedule', schedule).then(res => res.data);
