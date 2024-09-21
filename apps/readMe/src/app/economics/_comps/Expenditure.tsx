"use client";
import dayjs from "dayjs";
import Table, { type ColumnDef } from "@comps/table";
import { Card, CardContent } from "@ui/card";
import { LineChart } from "@comps/chart";
import { ExpenditureKey, LoanKey } from "@lib/const";
import { fullDateToMonth, getRowAmount } from "@lib/utils";
import DatePicker, { OnValueChange } from "@comps/datePicker";
import { Empty, Spin } from "antd";
import useGetFetch from "@hooks/useFetch";
import useLegends from "@hooks/useLegends";
import Add from "./Add";
import Menus from "./Menus";
import AddExpenditure from "@actions/addExpenditure";
import QueryExpenditureByDate from "@actions/queryExpenditureByDate";
import { onDatePickerChange, DefaultDatePicker } from "./utils";
import { useEffect } from "react";

const Keys = [...ExpenditureKey, ...LoanKey];
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
	...Keys.filter((key) => key !== "LoanBalance").map((accessorKey) => ({
		accessorKey,
		header: accessorKey,
		cell: ({ row }: any) => row.getValue(accessorKey) ?? "-",
	})),
	{
		accessorKey: "Amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => (
			<div className="font-bold text-right">
				{Math.round(
					Keys.filter((key) => key !== "LoanBalance")
						.map((key) => row.getValue<number>(key) ?? 0)
						.reduce((a, b) => a + b) * 100
				) / 100}
			</div>
		),
	},
	{
		accessorKey: "LoanBalance",
		header: () => <div className="text-right text-orange-600">LoanBalance</div>,
		cell: ({ row }) => (
			<div className="text-right">
				{row.getValue<number>("LoanBalance") || "-"}
			</div>
		),
		renderTotalCell: false,
	},
];

export default function Earning() {
	const { legends, onChange: onLegendsChange } = useLegends({
		id: "Expenditure",
		Legends: Keys,
	});

	const { loading, data, update } = useGetFetch<
		Record<"startDate" | "endDate", string>,
		Economics.DB<Economics.Earning>[]
	>({
		defaultData: [],
		url: "/api/expenditure",
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
			<CardContent className="gap-4 pl-0 pr-4 py-4 h-fit">
				<LineChart
					className="h-[460px] pt-2 pl-2"
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
					scrollAreaClassName="h-[360px] pl-4"
					columns={columns}
					data={data}
					showTotalRow
				/>
			</CardContent>
		);
	};
	const action = async (
		d: WithUpperDate<Economics.Expenditure & Economics.Loan, string>
	) => {
		await AddExpenditure(d);
		return update();
	};
	return (
		<div className="p-2">
			<div className="flex flex-row justify-between items-end mb-2 gap-2">
				<span className="font-bold text-xl">Expenditure</span>
				<div className="flex flex-row gap-2">
					<DatePicker
						type="Month"
						numberOfMonths={4}
						defaultDate={DefaultDatePicker}
						onValueChange={onDatePickerChange(update)}
					/>
					<Menus legends={legends} onLegendsChange={onLegendsChange} />
					<Add
						tip="Submit the form on 1st of every month."
						columns={Keys}
						action={action}
						query={QueryExpenditureByDate}
					/>
				</div>
			</div>
			<Card>{renderCardContent()}</Card>
		</div>
	);
}
