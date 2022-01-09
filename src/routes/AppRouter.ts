import { Router } from 'express';

export default class AppRouter {
	private static router: Router;

	static get instance(): Router {
		if (!this.router) {
			this.router = Router();
		}

		return this.router;
	}
}
