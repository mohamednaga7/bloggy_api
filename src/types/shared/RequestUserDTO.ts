interface RequestUserDTOInterface {
	username: string;
	email: string;
	_id: string;
}

export class RequestUserDTO implements RequestUserDTO {
	username: string;
	email: string;
	_id: string;

	constructor({ username, email, _id }: RequestUserDTOInterface) {
		this.username = username;
		this.email = email;
		this._id = _id;
	}

	toObject() {
		return { ...this };
	}
}
