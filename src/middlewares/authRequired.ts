import { BaseException } from './../Exceptions/BaseException';
import { NextFunction, Request, Response } from 'express';
import { BaseRequest, IRequestUserData } from '../types/shared/shared';

export const authRequired = (
	req: BaseRequest<any>,
	res: Response,
	next: NextFunction
) => {
	if (!req.user) {
		throw new BaseException(404, 'UNAUTHORIZED', 'User Not Authorized');
	}
	next();
};
