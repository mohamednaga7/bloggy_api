import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { BaseException } from '../../Exceptions/BaseException';
import User from '../../models/user';
import { ISignInRequestDTO } from '../../types/auth';
import { RequestUserDTO } from '../../types/shared/RequestUserDTO';
import { BaseRequest } from '../../types/shared/shared';
import AppRouter from '../AppRouter';

AppRouter.instance.post(
	'/signin',
	async (req: BaseRequest<ISignInRequestDTO>, res: Response) => {
		if (req.user) {
			throw new BaseException(
				400,
				'ALREADY_LOGGED_IN',
				'You are already logged in'
			);
		}
		const { usernameOrEmail, password } = req.body;
		try {
			const foundUser = await User.findOne({
				$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
			});
			if (!foundUser) {
				throw new BaseException(
					400,
					'INVALID_CREDENTIALS',
					'you have entered invalid credentials'
				);
			}

			if (!foundUser.isValidPassword(password)) {
				throw new BaseException(
					400,
					'INVALID_CREDENTIALS',
					'you have entered invalid credentials'
				);
			}

			const requestUser = new RequestUserDTO(foundUser.toObject());

			const token = sign(requestUser.toObject(), process.env.JWT_SECRET!);

			return res.json({
				token,
				user: requestUser,
			});
		} catch (e: any) {
			console.log(e);
			if (e instanceof BaseException) {
				throw e;
			} else {
				throw new BaseException(400, '', e.message);
			}
		}
	}
);
