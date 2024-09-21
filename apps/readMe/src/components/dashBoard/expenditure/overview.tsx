import { type ColumnDef } from "@tanstack/react-table";
import NumberCard, {
	Props as NumberCardProps,
} from "@/components/cards/number";
import LineChart, { Props as PropsLineChart } from "@comps/cards/lineChart";
import { formatAmount } from "@lib/utils";
import Table from "@comps/cards/table";

const renderCards = (data: Props["data"]["card"]) => {
	const Cards: NumberCardProps[] = [
		{
			title: "Expenditure",
			children: formatAmount(data.rmb, "zh"),
			desc: "Expenditure Of Current Month",
		},
		{
			title: "Expenditure Difference Monthly",
			children: formatAmount(data.hkDollar, "en"),
			desc: "Difference Of Previous Month And Current Month",
		},
		{
			title: "Expenditure Difference Yearly",
			children: formatAmount(data.hkDollar, "en"),
			desc: "Difference Of Previous Year And Current Year",
		},
		{
			title: "Last Payment Of Loan",
			children: formatAmount(data.allAssets, "zh"),
		},
		{
			title: "Rest Of Loan",
			children: formatAmount(data.allAssets, "zh"),
		},
	];
	return Cards.map((row, index) => {
		return <NumberCard key={index} className="col-span-1" {...row} />;
	});
};

const tableData = new Array(30).fill(1).map((item, index) => ({
	id: index.toString(),
	amount: 10000 - index,
	date: "2023-4-29",
	detail: "这是一个无缘无故的信息，谁能没有呢？",
}));
const tableColumns: ColumnDef<(typeof tableData)[number]>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => <div>{parseInt(row.getValue("id")) + 1}</div>,
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "detail",
		header: "Detail",
	},
	{
		accessorKey: "amount",
		header: () => <div className="text-right">Amount</div>,
		cell: ({ row }) => {
			const formatted = formatAmount(parseFloat(row.getValue("amount")), "zh");
			return <div className="font-medium flex justify-end">{formatted}</div>;
		},
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
			<div className="grid gap-4 grid-cols-6">
				<LineChart
					className="col-span-4 flex flex-col dashboard-body-max-height"
					title="Historical Fluctuation"
					desc="Data Of Last 12 Months"
					data={data.lineChart}
				/>
				<Table
					className="col-span-2 flex flex-col dashboard-body-max-height"
					title="Top List"
					desc="Top 30 Of Last Expenditure"
					data={tableData}
					columns={tableColumns}
				/>
			</div>
		</div>
	);
}
