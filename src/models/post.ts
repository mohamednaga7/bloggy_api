import { Document, model, Schema } from 'mongoose';

interface IPostAuthor {
	_id: Schema.Types.ObjectId;
	username: string;
	email: string;
	fullName: string;
}

interface IPost extends Document {
	title: string;
	content: string;
	author: IPostAuthor;
	createdAt: Date;
}

const PostUserSchema = new Schema<IPostAuthor>({
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
});

const PostSchema = new Schema<IPost>(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: PostUserSchema,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Post = model<IPost>('Post', PostSchema);

export default Post;
