import NumberCard, {
	Props as NumberCardProps,
} from "@/components/cards/number";
import LineChart, { Props as PropsLineChart } from "@comps/cards/lineChart";
import PieChart from "@comps/cards/pieChart";
import { formatAmount } from "@lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@ui/carousel";
import Autoplay from "embla-carousel-autoplay";

/**
 *  1. 本月工资与上个月工资
 *  2. 本月工资与去年当月的工资
 *  3. 本季度的月平均工资与上个季度的月平均工资
 *  4. 本季度的月平均工资与去年对应季度的月平均工资
 *  5. 本年的月平均工资与去年的月平均工资
 */
const renderCards = (
	data: Props["data"]["card"],
	source: "Work" | "Part-Time" | "Other"
) => {
	const Cards: NumberCardProps[] = [
		{
			title: "Previous Month",
			children: formatAmount(data.hkDollar, "zh", { prefix: "+" }),
			desc: "Previous Month Over Current Month",
		},
		{
			title: "Month Of Previous Year",
			children: formatAmount(data.hkDollar, "zh", { prefix: "+" }),
			desc: "Month Of Previous Year Over Current Month",
		},
		{
			title: "Previous Quarter",
			children: formatAmount(data.stock, "zh", { prefix: "+" }),
			desc: "Previous Quarter Over Current Quarter",
		},
		{
			title: "Quarter Of Previous Year",
			children: formatAmount(data.allAssets, "zh", { prefix: "+" }),
			desc: "Quarter Of Previous Year Over Current Quarter",
		},
		{
			title: "Previous Year",
			children: formatAmount(data.allAssets, "zh", { prefix: "+" }),
			desc: "Previous Year Over Current Year",
		},
	];
	return Cards.map((row, index) => {
		return (
			<NumberCard
				key={index}
				className="col-span-1"
				{...row}
				desc={`${source} · ${row.desc}`}
			/>
		);
	});
};

export interface Props {
	data: {
		card: Record<"rmb" | "hkDollar" | "stock" | "allAssets", number>;
		lineChart: PropsLineChart["data"];
	};
}

/**
 *  1. card：工资、兼职、其他、季度平均收入（支持环比、同比两种分析模式）、年度平均收入环比
 *  2. recharts：可选时间段、~~多个季度（数据不足展示不做）、多个年度（数据不足展示不做）~~、收入类型的波形图（任意时间段则为单条线、季度或年度环比则为两条线、收入类型为图例）
 *  3. recharts：可选时间节点、季度、年度的收入组成的饼状图 piechart
 */
export default function Analytics({ data }: Props) {
	return (
		<div className="grid gap-y-4">
			<Carousel
				className="w-full"
				opts={{ loop: true }}
				plugins={[
					Autoplay({
						delay: 20000,
					}),
				]}
			>
				{/* 按照收入来源展开 */}
				<CarouselContent className="h-auto">
					<CarouselItem className={`grid gap-4 grid-cols-5`}>
						{renderCards(data.card, "Work")}
					</CarouselItem>
					<CarouselItem className={`grid gap-4 grid-cols-5`}>
						{renderCards(data.card, "Part-Time")}
					</CarouselItem>
					<CarouselItem className={`grid gap-4 grid-cols-5`}>
						{renderCards(data.card, "Other")}
					</CarouselItem>
				</CarouselContent>
			</Carousel>
			<div className="grid gap-4 grid-cols-6">
				<LineChart
					className="col-span-4 flex flex-col dashboard-body-max-height"
					title="Historical Fluctuation"
					desc="Data Of Last 12 Months"
					data={data.lineChart}
				/>
				<PieChart
					className="col-span-2 flex flex-col dashboard-body-max-height"
					title="Percentage Of Earning"
				/>
			</div>
		</div>
	);
}
