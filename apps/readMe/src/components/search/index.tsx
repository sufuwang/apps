import { Button, type ButtonProps } from "@ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
	CalendarIcon,
	EnvelopeClosedIcon,
	FaceIcon,
	GearIcon,
	PersonIcon,
	RocketIcon,
} from "@radix-ui/react-icons";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@ui/command";
import { useState } from "react";
export default function Search(
	props: ButtonProps & React.RefAttributes<HTMLButtonElement>
) {
	const [showCommand, setShowCommand] = useState(false);
	const cls =
		"inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 lg:w-44";

	return (
		<>
			<Button
				variant="outline"
				{...props}
				className={`${cls} ${props.className}`}
				onClick={() => setShowCommand(true)}
			>
				Search...
				<kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<MagnifyingGlassIcon height={14} />
				</kbd>
			</Button>
			<CommandDialog open={showCommand} onOpenChange={setShowCommand}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<FaceIcon className="mr-2 h-4 w-4" />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<RocketIcon className="mr-2 h-4 w-4" />
							<span>Launch</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<PersonIcon className="mr-2 h-4 w-4" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<EnvelopeClosedIcon className="mr-2 h-4 w-4" />
							<span>Mail</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<GearIcon className="mr-2 h-4 w-4" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
