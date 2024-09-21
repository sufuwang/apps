import Tabs from "../../tabs";
import Overview from "./overview";
import Analytics from "./analytics";

const data = {
	card: {
		rmb: 138762,
		hkDollar: 432765.2323,
		stock: 324563,
		allAssets: 234987646,
	},
	lineChart: {
		showTooltip: true,
		data: [
			{
				name: "2024.1",
				RMB: 4000.2,
				"HongKong Dollar": 2530,
				"All Assets": 2400,
			},
			{
				name: "2024.2",
				RMB: 3000,
				"HongKong Dollar": 1398,
				"All Assets": 2210,
			},
			{
				name: "2024.23",
				RMB: 1890,
				"HongKong Dollar": 4800,
				"All Assets": 2181,
			},
		],
		axis: [
			{
				dataKey: "RMB",
				strokeDasharray: "4 4",
			},
			{
				dataKey: "HongKong Dollar",
				strokeDasharray: "3 1 3 1",
			},
			{
				dataKey: "All Assets",
				strokeDasharray: "6 4 2 4 6",
			},
		],
	},
};

export default function Income() {
	return (
		<Tabs
			defaultValue="analytics"
			data={[
				{
					label: "Overview",
					value: "overview",
					children: <Overview data={data} />,
				},
				{
					label: "Analytics",
					value: "analytics",
					children: <Analytics data={data} />,
				},
			]}
		/>
	);
}
