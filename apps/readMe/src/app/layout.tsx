import Navigation from "@comps/navigation";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
