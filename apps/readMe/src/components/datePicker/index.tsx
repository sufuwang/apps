"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

type Type = "Year" | "Month" | "Day";
export type OnValueChange = (
	dateRange: Record<"from" | "to", (number | string)[]>
) => void;

const ReflectFormat: Record<Type, string> = {
	Year: "y",
	Month: "LLL y",
	Day: "LLL d, y",
};
const handles = [
	(date: Date) => date.getFullYear(),
	(date: Date) => date.getMonth() + 1,
	(date: Date) => date.getDay(),
];
const ReflectFormatConvert = {
	Year: handles.slice(0, 1),
	Month: handles.slice(0, 2),
	Day: handles,
} as const;

export interface Props {
	type: Type;
	numberOfMonths?: number;
	defaultDate?: Partial<Record<"from" | "to", string>>;
	onValueChange: OnValueChange;
}

export default function DatePicker({
	type,
	className,
	numberOfMonths = 2,
	defaultDate = {},
	onValueChange,
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	const formatStr = ReflectFormat[type];
	const formatConvert = ReflectFormatConvert[type];
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: defaultDate?.from
			? new Date(defaultDate?.from)
			: subMonths(new Date(), 12),
		to: defaultDate?.to ? new Date(defaultDate.to) : new Date(),
	});

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover
				onOpenChange={(isOpen) => {
					if (isOpen) {
						return;
					}
					const time = Object.assign(
						{
							from: subMonths(new Date(), 12),
							to: new Date(),
						},
						date
					);
					setDate(time);
					onValueChange({
						from: formatConvert.map((convert) => convert(time.from)),
						to: formatConvert.map((convert) => convert(time.to)),
					});
				}}
			>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, formatStr)} - {format(date.to, formatStr)}
								</>
							) : (
								format(date.from, formatStr)
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={numberOfMonths}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
