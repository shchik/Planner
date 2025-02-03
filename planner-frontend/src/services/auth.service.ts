import { axiosClassic } from "@/api/interceptors";
import { IAuthForm, IAuthResponse } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export const AuthService = {
	async main(
		type: "login" | "register",
		data: IAuthForm
	): Promise<IAuthResponse> {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		);

		if (response.data.access_token)
			saveTokenStorage(response.data.access_token);

		return response.data;
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			"/auth/login/access-token"
		);

		if (response.data.access_token)
			saveTokenStorage(response.data.access_token);

		return response;
	},

	async logout() {
		const response = await axiosClassic.post<boolean>("/auth/logout");

		if (response.data) removeFromStorage();

		return response;
	},
};
