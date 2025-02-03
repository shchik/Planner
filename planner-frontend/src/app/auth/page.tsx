import { Metadata } from "next";
import AuthForm from "./auth";

export const metadata: Metadata = {
	title: "Auth",
};

const AuthPage: React.FC = () => {
	return <AuthForm />;
};

export default AuthPage;
