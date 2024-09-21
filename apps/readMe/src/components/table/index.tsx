import {
	Table as RcTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableFooter,
} from "@ui/table";
import { ScrollArea } from "@ui/scroll-area";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@ui/tooltip";

type TotalRow = {
	renderTotalCell?: false | "Total";
};
type _ColumnDef<T> = ColumnDef<T> & TotalRow;
export type { _ColumnDef as ColumnDef };

interface Props<T = any> {
	defaultValue?: any;
	data: Array<T>;
	columns: ColumnDef<T>[];
	scrollAreaClassName?: string;
	showTotalRow?: boolean;
}

export default function ScrollTable({
	data,
	columns,
	defaultValue = "-",
	scrollAreaClassName,
	showTotalRow = false,
	...props
}: Props & React.RefAttributes<HTMLTableElement>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const renderTotalRow = () => {
		if (!showTotalRow) {
			return;
		}
		return (
			<TableFooter className="sticky bottom-0 bg-muted">
				<TableRow>
					{columns.map((column: any) => {
						if (column.renderTotalCell === "Total") {
							return <TableCell key={column.accessorKey}>Total</TableCell>;
						} else if (column.renderTotalCell === false) {
							return (
								<TableCell key={column.accessorKey}>
									{column.cell({
										row: {
											getValue: () => void 0,
										},
									})}
								</TableCell>
							);
						}
						return (
							<TableCell key={column.accessorKey}>
								{column.cell({
									row: {
										getValue(key: keyof typeof column) {
											return +data
												.map((item) => item[key])
												.reduce((a, b) => a + b)
												?.toFixed(2);
										},
									},
								})}
							</TableCell>
						);
					})}
				</TableRow>
			</TableFooter>
		);
	};

	return (
		<ScrollArea className={`h-full ${scrollAreaClassName}`}>
			<RcTable {...props} className="overflow-auto relative">
				<TableHeader className="sticky top-0 bg-white">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="truncate max-w-32">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="mx-4 flex-auto">
					{table.getRowModel().rows.map((row) => {
						if (row.original.Description) {
							return (
								<TooltipProvider key={row.id}>
									<Tooltip>
										<TooltipTrigger asChild>
											<TableRow key={row.id}>
												{row.getVisibleCells().map((cell) => (
													<TableCell
														key={cell.id}
														className="whitespace-nowrap"
													>
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														) || defaultValue}
													</TableCell>
												))}
											</TableRow>
										</TooltipTrigger>
										<TooltipContent>
											<div className="flex flex-col">
												{row.original.Description.split("；").map(
													(row: string, index: number) => (
														<div key={index}>{row}</div>
													)
												)}
											</div>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							);
						}
						return (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="whitespace-nowrap">
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										) || defaultValue}
									</TableCell>
								))}
							</TableRow>
						);
					})}
				</TableBody>
				{renderTotalRow()}
			</RcTable>
		</ScrollArea>
	);
}
