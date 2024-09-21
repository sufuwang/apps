import { type ColumnDef } from "@tanstack/react-table";
import NumberCard, { Props as NumberCardProps } from "@comps/cards/number";
import LineChart, { Props as PropsLineChart } from "@comps/cards/lineChart";
import { formatAmount } from "@lib/utils";
import Table from "@comps/cards/table";

const renderCards = (data: Props["data"]["card"]) => {
	const Cards: NumberCardProps[] = [
		{
			title: "Undone Task Of High Level",
			children: formatAmount(data.rmb, "zh", { noCurrency: true }),
			link: "http://baidu.com",
			desc: "Number of unfinished tasks with level greater than 3",
		},
		{
			title: "Undone Task Ratio",
			children: formatAmount(data.hkDollar, "en", { noCurrency: true }),
			desc: "Number of unfinished tasks divided by total number of tasks current month",
		},
		{
			title: "Number Of Done Task In 2024 Plan",
			children: formatAmount(data.hkDollar, "en", { noCurrency: true }),
		},
		{
			title: "Ratio Of Done Task In 2024 Plan",
			children: formatAmount(data.allAssets, "zh", { noCurrency: true }),
		},
		{
			title: "All Task In 2024 Plan",
			children: formatAmount(data.allAssets, "zh", { noCurrency: true }),
		},
	];
	return Cards.map((row, index) => {
		return <NumberCard key={index} className="col-span-1" {...row} />;
	});
};

const tableData = new Array(30).fill(1).map((item, index) => ({
	id: index.toString(),
	startDate: "2023-4-29",
	endDate: "2023-5-29",
	detail: "这是一个无缘无故的信息，谁能没有呢？",
	isDelay: index % 2 === 0,
}));
const tableColumns: ColumnDef<(typeof tableData)[number]>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => <div>{parseInt(row.getValue("id")) + 1}</div>,
	},
	{
		accessorKey: "detail",
		header: "Detail",
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
	},
	{
		accessorKey: "endDate",
		header: "End Date",
	},
	{
		accessorKey: "isDelay",
		header: "Delay",
		cell: ({ row }) => <div>{row.getValue("isDelay") ? "Y" : "N"}</div>,
	},
];

export interface Props {
	data: {
		card: Record<"rmb" | "hkDollar" | "stock" | "allAssets", number>;
		lineChart: PropsLineChart["data"];
	};
}

/**
 * 1. card：人民币总额 、港币总额、实时股价、实时汇率金额汇总
 * 2. recharts：历史 12 月人民币收入波动、历史 12 月港币收入波动、历史 12 月收入汇总波动 （两条线：波动数据 & 平均线、可切换）
 * 3. recent：本季度或年度最近 5 个大额收入，包含时间、金额、来源（detail）信息
 */
export default function Overview({ data }: Props) {
	return (
		<div className="grid gap-y-4">
			<div className="grid gap-4 grid-cols-5">{renderCards(data.card)}</div>
			<div className="grid gap-4 grid-cols-5">
				<LineChart
					className="col-span-3 flex flex-col dashboard-body-max-height"
					title="Historical Fluctuation"
					desc="Data Of Last 12 Months"
					data={data.lineChart}
				/>
				<Table
					className="col-span-2 flex flex-col dashboard-body-max-height"
					title="Task List"
					desc="Last 30 Done Task"
					data={tableData}
					columns={tableColumns}
				/>
			</div>
		</div>
	);
}
