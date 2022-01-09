import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BaseRequest, IRequestUserData } from '../types/shared/shared';

export const isAuthenticated = (
	req: BaseRequest<null>,
	res: Response,
	next: NextFunction
) => {
	if (req.header('authorization')) {
		const token = req.header('authorization')?.replace('Bearer ', '');
		if (token) {
			const payload = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as IRequestUserData;
			req.user = payload.user;
		}
	}
	next();
};
