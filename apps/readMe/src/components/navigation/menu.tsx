import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@ui/navigation-menu";
import Link from "next/link";
import {
	NotionLogoIcon,
	GitHubLogoIcon,
	TwitterLogoIcon,
	SunIcon,
} from "@radix-ui/react-icons";
import Search from "@comps/search";

const Icons = [NotionLogoIcon, GitHubLogoIcon, TwitterLogoIcon, SunIcon];

export default function Navigation() {
	return (
		<div className="flex flex-row items-center">
			<Search className="mr-4" />
			<NavigationMenu>
				<NavigationMenuList>
					{Icons.map((Icon, index) => (
						<NavigationMenuItem key={index}>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink
									className={`${navigationMenuTriggerStyle()} bg-transparent px-[8px]`}
								>
									<Icon width={16} height={16} />
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
