import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";
import Link from "next/link";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	children: JSX.Element | string;
	desc?: string;
	link?: string;
}

export default function NumberCard({
	title,
	children,
	desc,
	link,
	...props
}: Props) {
	const CardApp = () => (
		<Card {...props} className={`h-full ${props.className}`}>
			<CardHeader>
				<CardTitle className="flex flex-row justify-between">
					{title}
					{link && <ExternalLinkIcon className="ml-2" />}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{children}</div>
				{desc && <CardDescription>{desc}</CardDescription>}
			</CardContent>
		</Card>
	);

	if (link) {
		return (
			<Link href={link} className="h-full">
				<CardApp />
			</Link>
		);
	}

	return <CardApp />;
}
