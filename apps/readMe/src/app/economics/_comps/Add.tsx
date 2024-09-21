import { Button } from "@ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { useForm } from "react-hook-form";
import { convertFirstWord } from "@lib/utils";
import { DatePicker, message } from "antd";
import { useEffect, useState } from "react";

interface Props {
	tip?: string;
	columns: Array<string>;
	action: (d: any) => Promise<unknown>; // 表单提交
	query: (d: string) => Promise<string>; // 根据时间查询表单
}
export default function AddDialog({ tip, columns, action, query }: Props) {
	const [isShow, setIsShow] = useState(false);
	const form = useForm({
		defaultValues: Object.fromEntries(columns.map((column) => [column, 0])),
	});
	const dateValue = form.watch("Date") as WithUpperDate["Date"];

	useEffect(() => {
		if (!dateValue) {
			columns.forEach((key) => {
				form.setValue(key, 0);
			});
			return;
		}
		query(dateValue.format("YYYY-MM")).then((rowStr) => {
			try {
				const row = JSON.parse(rowStr);
				columns.forEach((key) => {
					form.setValue(key, row[key] ?? 0);
				});
				form.setValue("Description", row.Description || "");
			} catch (e) {
				console.error(e);
			}
		});
	}, [dateValue]);

	return (
		<Dialog
			open={isShow}
			onOpenChange={(d) => {
				setIsShow(d);
				form.reset();
			}}
		>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setIsShow(true)}>
					Add
				</Button>
			</DialogTrigger>
			<DialogContent className="w-1/3">
				<DialogHeader>
					<DialogTitle>Economics Form</DialogTitle>
					{tip && <DialogDescription>{tip}</DialogDescription>}
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-8"
						onSubmit={form.handleSubmit(async (d) => {
							const { Date } = d as unknown as WithUpperDate;
							if (!Date) {
								message.error("Please select a date");
								return;
							}
							await action({
								...d,
								Date: Date.format("YYYY-MM"),
							});
							setIsShow(false);
						})}
					>
						<div className="grid grid-cols-3 gap-2">
							<FormField
								control={form.control}
								name="Date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date</FormLabel>
										<FormControl>
											<DatePicker {...field} picker="month" format="YYYY MMM" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{columns.map((column, index) => (
								<FormField
									key={index}
									control={form.control}
									name={column}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{convertFirstWord(column, "upper")}</FormLabel>
											<FormControl>
												<Input {...field} type="number" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
							<FormField
								name="Description"
								control={form.control}
								render={({ field }) => {
									return (
										<FormItem className="col-span-3">
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder="Type description here."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						</div>
						<div className="flex flex-row justify-end gap-2">
							<DialogClose asChild>
								<Button
									type="button"
									variant="secondary"
									onClick={() => setIsShow(false)}
								>
									Close
								</Button>
							</DialogClose>
							<Button type="submit">Confirm</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
