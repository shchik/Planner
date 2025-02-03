"use client";

import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
	const userService = new UserService();
	const { data, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: () => userService.getProfile(),
	});

	return { data, isLoading };
}
