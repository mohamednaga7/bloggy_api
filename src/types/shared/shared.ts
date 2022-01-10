import { Request } from 'express';

export interface IRequestUser {
	_id: string;
	username: string;
	email: string;
}

export interface IRequestUserData {
	token?: string;
	user?: IRequestUser;
}

export interface BaseRequest<T> extends Request {
	user?: IRequestUser;
	body: T;
}
