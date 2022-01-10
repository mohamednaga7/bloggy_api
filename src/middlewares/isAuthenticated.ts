import { IRequestUser } from './../types/shared/shared';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BaseRequest } from '../types/shared/shared';

export const isAuthenticated = (
	req: BaseRequest<any>,
	res: Response,
	next: NextFunction
) => {
	if (req.header('authorization')) {
		const token = req.header('authorization')?.replace('Bearer ', '');
		if (token) {
			const payload = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as IRequestUser;
			req.user = payload;
		}
	}
	next();
};
