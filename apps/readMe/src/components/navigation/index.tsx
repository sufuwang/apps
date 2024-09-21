"use client";
import Navigate from "./navigate";
import Menu from "./menu";

export default function Navigation() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<Navigate />
				<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<Menu />
				</div>
			</div>
		</header>
	);
}
