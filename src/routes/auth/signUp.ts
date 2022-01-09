import { AuthUrls } from './AuthUrls';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { BaseException } from '../../Exceptions/BaseException';
import User from '../../models/user';
import { ISignUpRequestDTO } from '../../types/auth';
import { RequestUserDTO } from '../../types/shared/RequestUserDTO';
import { BaseRequest } from '../../types/shared/shared';
import AppRouter from '../AppRouter';

AppRouter.instance.post(
	AuthUrls.signUp,
	async (req: BaseRequest<ISignUpRequestDTO>, res: Response) => {
		if (req.user) {
			throw new BaseException(
				400,
				'ALREADY_LOGGED_IN',
				'You are already logged in'
			);
		}
		const { username, email } = req.body;
		try {
			const foundUser = await User.findOne({
				$or: [{ username }, { email }],
			});
			if (foundUser) {
				throw new BaseException(
					400,
					'USER_ALREADY_EXISTS',
					'a user with the entered credentials already exists'
				);
			}

			const user = await User.create(req.body);

			if (!user) {
				throw new BaseException(
					400,
					'ERROR_STORING_USER',
					'Error while trying to store the user to the database'
				);
			}

			const requestUser = new RequestUserDTO(user.toObject());

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
