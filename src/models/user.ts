import { Document, model, Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs';

interface IUser extends Document {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	password: string;
	age: number;
	createdAt: Date;
	isValidPassword: (password: string) => boolean;
}

const UserSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
			index: true,
		},
		lastName: {
			type: String,
			required: true,
			index: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		age: {
			type: Number,
			required: true,
		},
		email: {
			type: String,
			required: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

UserSchema.pre('save', async function (this: IUser, next) {
	if (this.isModified('password')) {
		const hashedPassword = await hash(this.password, 14);
		this.password = hashedPassword;
	}
});

UserSchema.methods.isValidPassword = async function (
	this: IUser,
	password: string
) {
	return await compare(password, this.password);
};

const User = model<IUser>('User', UserSchema);

export default User;
