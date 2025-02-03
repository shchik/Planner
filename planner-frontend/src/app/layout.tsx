"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.scss";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	return (
		<html lang="en">
			<body className={`${roboto} ${robotoMono.variable} antialiased`}>
				<QueryClientProvider client={queryClient}>
					<ToastContainer position="bottom-right" autoClose={3000} />
					{children}
				</QueryClientProvider>
			</body>
		</html>
	);
}
