"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@ui/card";
import Select from "./components/select";

const Loading = () => <div className="h-[766px]" />;
const Earning = dynamic(() => import("./earning"), { loading: Loading });
const Expenditure = dynamic(() => import("./expenditure"), {
	loading: Loading,
});
const Task = dynamic(() => import("./task"), { loading: Loading });

const reflect = [
	{ label: "Task", value: "task", children: <Task /> },
	{ label: "Earning", value: "earning", children: <Earning /> },
	{ label: "Expenditure", value: "expenditure", children: <Expenditure /> },
];

const renderChild = (value: (typeof reflect)[number]["value"]) => {
	const row = reflect.find((item) => item.value === value);
	return row ? row.children : null;
};

export default function DashBoard() {
	const [value, setValue] = useState(reflect[1].value);
	return (
		<Card className="border-0 shadow-none flex flex-col">
			<CardHeader>
				<div className="relative flex justify-between">
					<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
					<div className="absolute right-0 top-[60px]">
						<Select
							data={reflect}
							defaultValue={value}
							onValueChange={setValue}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex-auto">{renderChild(value)}</CardContent>
		</Card>
	);
}
