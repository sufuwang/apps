"use client";

import { LineChart, XAxis, Line, LineProps } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "@ui/chart";

type ChartConfigValue = ChartConfig[keyof ChartConfig] & {
	type?: LineProps["type"];
};
interface Props<T = Record<string, any>> {
	xAxis: keyof T;
	className?: string;
	chartData: Array<T>;
	chartConfig: Record<keyof T, ChartConfigValue>;
}

export default function Chart({
	chartData,
	chartConfig,
	xAxis,
	className,
}: Props) {
	const renderXAxis = () => {
		if (!xAxis || chartData[0][xAxis] === undefined) {
			return;
		}
		return (
			<XAxis
				dataKey={xAxis}
				tickLine={false}
				tickMargin={10}
				axisLine={false}
			/>
		);
	};
	const renderLines = () => {
		const lines = Object.keys(chartConfig).map((key) => {
			const config = chartConfig[key satisfies keyof typeof chartConfig];
			return {
				type: config.type ?? "monotone",
				dataKey: key,
				stroke: config.color,
			};
		});
		return lines.map((lineOption) => (
			<Line key={lineOption.dataKey} {...lineOption} />
		));
	};

	return (
		<ChartContainer
			config={chartConfig}
			className={`w-full h-full ${className}`}
		>
			<LineChart accessibilityLayer data={chartData}>
				{renderLines()}
				{renderXAxis()}
				<ChartLegend content={<ChartLegendContent />} />
				<ChartTooltip content={<ChartTooltipContent />} />
			</LineChart>
		</ChartContainer>
	);
}
