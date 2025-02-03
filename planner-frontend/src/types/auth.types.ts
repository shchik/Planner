export interface IUserResponse {
	email: string;
	name: string;
}

export interface IAuthForm {
	email: string;
	name?: string;
	password: string;
}

export interface IUser {
	id: number;
	email: string;
	name: string;
}

export interface IAuthResponse {
	access_token: string;
	user: IUser;
}
