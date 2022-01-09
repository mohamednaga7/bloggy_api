export interface ISignUpRequestDTO {
	firstName: string;
	lastName: string;
	age: number;
	username: string;
	email: string;
	password: string;
}

export interface ISignInRequestDTO {
	usernameOrEmail: string;
	password: string;
}
