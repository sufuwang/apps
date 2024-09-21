import { cn } from "@lib/utils";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuContent,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@ui/navigation-menu";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const Links = [
	{ label: "Home", link: "/" },
	{ label: "Economics", link: "/economics" },
	{ label: "Task", link: "/task" },
	{
		label: "Docs",
		link: "/docs",
		icon: <ExternalLinkIcon />,
	},
];
const labelCls =
	"mx-1 cursor-pointer hover:text-foreground flex flex-row items-center";

export default function Navigation() {
	const router = useRouter();
	const pathName = usePathname();

	return (
		<NavigationMenu>
			<NavigationMenuList className="flex items-center gap-6 text-sm">
				{Links.map((item) => (
					<NavigationMenuItem
						key={item.link}
						className={`${labelCls} ${
							(
								item.link === "/"
									? pathName === item.link
									: pathName.startsWith(item.link)
							)
								? "text-foreground font-bold"
								: "text-foreground/40"
						}`}
						onClick={() => {
							router.push(item.link);
						}}
					>
						{item.label}
						<span className="ml-1">{item.icon}</span>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
