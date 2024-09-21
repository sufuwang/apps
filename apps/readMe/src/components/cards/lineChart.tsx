import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@ui/card";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from "@ui/menubar";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const CustomizedLabel = (props: any) => {
	const { x, y, stroke, value } = props;
	return (
		<text x={x} y={y} dy={-4} fill={stroke} fontSize={12} textAnchor="middle">
			{value}
		</text>
	);
};
const CustomizedAxisTick = (props: any) => {
	const { x, y, payload, fill } = props;
	return (
		<g transform={`translate(${x},${y})`}>
			<text x={20} y={4} dy={10} textAnchor="end" fill={fill}>
				{payload.value}
			</text>
		</g>
	);
};

export interface Props {
	title: string;
	desc?: string;
	data: {
		showTooltip?: boolean;
		showLegend?: boolean;
		data: Array<{ name: string; [K: string]: string | number }>;
		axis: Array<{
			dataKey: string;
			enLabel?: boolean;
			show?: boolean;
			strokeDasharray: string;
		}>;
	};
}

/**
 * 支持两种模式: single / multiple
 * @TODO single 模式: 数据波动 & 波动的平均线
 */
export default function NumberCard({
	title,
	desc,
	data,
	...otherProps
}: Props & React.HTMLAttributes<HTMLDivElement>) {
	const [lineKeys, setLineKeys] = useState(
		data.axis.map((item) => item.dataKey)
	);
	const [axis, setAxis] = useState(data.axis);

	useEffect(() => {
		setAxis(
			data.axis.map((item) => ({
				...item,
				show: lineKeys.includes(item.dataKey),
			}))
		);
	}, []);

	const onCheckedChange = (show: boolean, lineKey: string) => {
		const newLineKeys = show
			? [...lineKeys, lineKey]
			: lineKeys.filter((key) => key !== lineKey);
		setLineKeys(newLineKeys);
		setAxis(
			data.axis.map((item) => ({
				...item,
				show: newLineKeys.includes(item.dataKey),
			}))
		);
	};

	const renderLine = () => {
		return axis
			.filter((axis) => axis.show)
			.map((item) => (
				<Line
					type="monotone"
					key={item.dataKey}
					dataKey={item.dataKey}
					stroke="#000"
					strokeDasharray={item.strokeDasharray}
					label={<CustomizedLabel />}
				/>
			));
	};
	const renderLines = (appData: Props["data"]) => {
		return (
			<ResponsiveContainer>
				<LineChart
					data={appData.data}
					margin={{
						top: 0,
						right: 20,
						left: 20,
						bottom: appData.showLegend ? 10 : 0,
					}}
				>
					<CartesianGrid strokeDasharray="5 5" />
					<XAxis dataKey="name" height={50} tick={<CustomizedAxisTick />} />
					<YAxis />
					{appData.showTooltip && <Tooltip />}
					{appData.showLegend && <Legend />}
					{renderLine()}
				</LineChart>
			</ResponsiveContainer>
		);
	};
	const renderMenubar = () => {
		return (
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>Line</MenubarTrigger>
					<MenubarContent>
						{data.axis.map((item) => (
							<MenubarCheckboxItem
								key={item.dataKey}
								disabled={lineKeys.length === 1 && lineKeys[0] === item.dataKey}
								checked={lineKeys.includes(item.dataKey)}
								onCheckedChange={(d) => onCheckedChange(d, item.dataKey)}
							>
								<svg className="mr-1" width="50" height="2">
									<line
										x1="0"
										y1="0"
										x2="50"
										y2="0"
										style={{
											stroke: "#000",
											strokeWidth: "2px",
											strokeDasharray: item.strokeDasharray,
										}}
									/>
								</svg>
								&nbsp;
								{item.dataKey}
							</MenubarCheckboxItem>
						))}
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		);
	};

	return (
		<Card {...otherProps}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<div
					className={`flex ${
						desc ? "justify-between items-start" : "relative justify-end"
					}  `}
				>
					{desc && <CardDescription>{desc}</CardDescription>}
					{renderMenubar()}
				</div>
			</CardHeader>
			<CardContent className="mx-4 p-0 flex-auto">
				{renderLines(data)}
			</CardContent>
		</Card>
	);
}
