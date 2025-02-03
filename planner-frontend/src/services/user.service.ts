import { axiosWithAuth } from "@/api/interceptors";
import { IProfileResponse } from "@/types/profile.types";

export class UserService {
	private base_url = "/user";

	async getProfile(): Promise<IProfileResponse> {
		const response = await axiosWithAuth.get(`${this.base_url}/profile`);

		return response.data;
	}
}
