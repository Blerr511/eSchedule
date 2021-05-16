import {ParamListBase} from '@react-navigation/routers';

export enum StepperFlow {
	FACULTY = 'STUDENT_STEPPER_FLOW_FACULTY',
	GROUP = 'STUDENT_STEPPER_FLOW_GROUP'
}

export interface StepperFlowParams extends ParamListBase {
	[StepperFlow.FACULTY]: undefined;
	[StepperFlow.GROUP]: {facultyId: string};
}
