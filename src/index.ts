import { BaseException } from './Exceptions/BaseException';
import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import AppRouter from './routes/AppRouter';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use('/api', AppRouter.instance);

import './routes/index';

app.use(
	(err: BaseException, req: Request, res: Response, next: NextFunction) => {
		console.log(err);
		res.status(err.statusCode).json({
			message: err.message,
			key: err.key,
		});
	}
);

const url = `mongodb+srv://${process.env.MONGODB_DATABASE_USERNAME}:${process.env.MONGODB_DATABASE_PASSWORD}@${process.env.MONGODB_DATABASE_HOST}/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;
console.log(url);
mongoose.connect(url).then(() => {
	const PORT = process.env.PORT || 5001;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
