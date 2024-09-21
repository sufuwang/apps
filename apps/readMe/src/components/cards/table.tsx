import { type ColumnDef } from "@tanstack/react-table";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@ui/card";
import TableApp from "@comps/table";

interface Props<T = any> {
	title: string;
	desc: string;
	data: Array<T>;
	columns: ColumnDef<T>[];
}
export default function Table({
	title,
	desc,
	data,
	columns,
	...props
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<Card className="rounded-md border" {...props}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{desc}</CardDescription>
			</CardHeader>
			<CardContent className="mx-4 p-0 mb-6 flex-auto overflow-hidden">
				<TableApp data={data} columns={columns} />
			</CardContent>
		</Card>
	);
}
