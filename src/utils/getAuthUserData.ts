import { BaseException } from './../Exceptions/BaseException';
import User from '../models/user';

export const getAuthUserData = async (userId: string) => {
	console.log(userId);
	const user = await User.findById(userId).select(
		'email username firstName lastName id'
	);
	if (!user) {
		throw new BaseException(403, 'NOT_AUTHORIZED', 'You are not authorized');
	}
	return user;
};
