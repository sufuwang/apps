"use client";
import dayjs from "dayjs";
import Table, { type ColumnDef } from "@comps/table";
import { Card, CardContent } from "@ui/card";
import { LineChart } from "@comps/chart";
import { EarningKey as Keys } from "@lib/const";
import { fullDateToMonth, getRowAmount } from "@lib/utils";
import DatePicker, { OnValueChange } from "@comps/datePicker";
import { Empty, Spin } from "antd";
import useLegends from "@hooks/useLegends";
import useGetFetch from "@hooks/useFetch";
import Add from "./Add";
import Menus from "./Menus";
import AddEarning from "@actions/addEarning";
import QueryEarningByDate from "@actions/queryEarningByDate";
import { onDatePickerChange, DefaultDatePicker } from "./utils";
import { useEffect } from "react";

const columns: ColumnDef<
	Economics.Combine<Economics.Expenditure & Economics.Loan>
>[] = [
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) =>
			dayjs(row.getValue("Date"), ["YYYY.M", "YYYY.MM"]).format("YYYY MMMM"),
		renderTotalCell: "Total",
	},
	...Keys.map((accessorKey) => ({
		accessorKey,
		cell: ({ row }: any) => (
			<div className="pl-1">{row.getValue(accessorKey) ?? "-"}</div>
		),
	})),
	{
		accessorKey: "Amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => (
			<div className="font-bold text-right pr-1">
				{Math.round(
					Keys.map((key) => row.getValue<number>(key) ?? 0).reduce(
						(a, b) => a + b
					) * 100
				) / 100}
			</div>
		),
	},
];

export default function Earning() {
	const { legends, onChange: onLegendsChange } = useLegends({
		id: "Earning",
		Legends: Keys,
	});

	const { loading, data, update } = useGetFetch<
		Record<"startDate" | "endDate", string>,
		Economics.DB<Economics.Earning>[]
	>({
		defaultData: [],
		url: "/api/earning",
	});

	useEffect(() => {
		onDatePickerChange(update)({
			from: DefaultDatePicker.from.split("-"),
			to: DefaultDatePicker.to.split("-"),
		});
	}, []);

	const renderCardContent = () => {
		if (loading) {
			return (
				<CardContent className="gap-4 py-4 px-4 max-h-2/3 grid grid-cols-1">
					<Spin />
				</CardContent>
			);
		}
		if (!Array.isArray(data) || data.length === 0) {
			return (
				<CardContent className="gap-4 py-4 px-4 max-h-2/3 grid grid-cols-1">
					<Empty />
				</CardContent>
			);
		}
		return (
			<CardContent className="gap-4 pl-0 pr-4 py-4 grid grid-cols-5">
				<LineChart
					className="h-[460px] col-span-3 pt-2 pl-2"
					xAxis="date"
					chartData={[
						...data.map((item) => ({
							date: fullDateToMonth(item.Date),
							...item,
							Amount: getRowAmount(item),
						})),
					].reverse()}
					chartConfig={Object.fromEntries(
						legends
							.filter(({ show }) => show)
							.map(({ label: key }) => [
								key,
								{
									type: "monotone",
									label: key,
									color: "#444",
								},
							])
					)}
				/>
				<Table
					scrollAreaClassName="h-[460px] col-span-2 pb-2"
					columns={columns}
					data={data}
					showTotalRow
				/>
			</CardContent>
		);
	};
	const action = async (d: WithUpperDate<Economics.Earning, string>) => {
		await AddEarning(d);
		return update();
	};
	return (
		<div className="p-2">
			<div className="flex flex-row justify-between items-end mb-2 gap-2">
				<span className="font-bold text-xl">Earning</span>
				<div className="flex flex-row gap-2">
					<DatePicker
						type="Month"
						numberOfMonths={4}
						defaultDate={DefaultDatePicker}
						onValueChange={onDatePickerChange(update)}
					/>
					<Menus legends={legends} onLegendsChange={onLegendsChange} />
					<Add
						tip="Submit the form on 10th of every month."
						columns={Keys}
						action={action}
						query={QueryEarningByDate}
					/>
				</div>
			</div>
			<Card>{renderCardContent()}</Card>
		</div>
	);
}
