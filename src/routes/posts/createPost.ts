import { ICreatePostRequestDTO } from './../../types/posts';
import { getAuthUserData } from './../../utils/getAuthUserData';
import { BaseException } from './../../Exceptions/BaseException';
import { authRequired } from './../../middlewares/authRequired';
import { isAuthenticated } from './../../middlewares/isAuthenticated';
import { Response } from 'express';
import { PostsUrls } from './PostsUrls';
import AppRouter from '../AppRouter';
import { BaseRequest } from '../../types/shared/shared';
import Post from '../../models/post';

AppRouter.instance.post(
	PostsUrls.createPost,
	isAuthenticated,
	authRequired,
	async (req: BaseRequest<ICreatePostRequestDTO>, res: Response) => {
		try {
			const user = await getAuthUserData(req.user!._id);
			const post = new Post(req.body);
			post.author = {
				_id: user._id,
				username: user.username,
				email: user.email,
				fullName: user.firstName + ' ' + user.lastName,
			};

			const savedPost = await post.save();
			if (!savedPost)
				throw new BaseException(400, 'BAD_REQUEST', 'Error while saving post');

			res.status(201).json(post);
		} catch (e) {
			if (e instanceof BaseException) {
				throw e;
			} else {
				throw new BaseException(
					500,
					'INTERNAL_SERVER_ERROR',
					'Internal Server Error'
				);
			}
		}
	}
);
