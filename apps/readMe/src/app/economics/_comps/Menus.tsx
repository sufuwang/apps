import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@ui/menubar";
import type { Legends, OnChange } from "@hooks/useLegends";

interface Props {
	legends: Legends;
	onLegendsChange: OnChange;
}

export default function Legend({ legends, onLegendsChange }: Props) {
	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>Legend</MenubarTrigger>
				<MenubarContent>
					<MenubarItem inset onClick={() => onLegendsChange(true)}>
						Show All Lines
					</MenubarItem>
					<MenubarItem inset onClick={() => onLegendsChange(false)}>
						Hide All Lines
					</MenubarItem>
					<MenubarSeparator />
					{legends.map((legend) => (
						<MenubarCheckboxItem
							key={legend.label}
							checked={legend.show}
							onCheckedChange={(d) => onLegendsChange(legend.label, d)}
						>
							{legend.label}
						</MenubarCheckboxItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
