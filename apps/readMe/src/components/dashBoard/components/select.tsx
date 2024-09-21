import {
	Select as UISelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
	type SelectProps,
} from "@/components/ui/select";

export interface Props {
	data: Array<Record<"label" | "value", string>>;
}

const renderSelectItems = (data: Props["data"]) => {
	return data.map((item) => (
		<SelectItem key={item.value} value={item.value}>
			{item.label}
		</SelectItem>
	));
};

export default function Select({ data = [], ...props }: Props & SelectProps) {
	return (
		<UISelect {...props}>
			<SelectTrigger className="w-[120px]">
				<SelectValue placeholder="Select A Component" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>{renderSelectItems(data)}</SelectGroup>
			</SelectContent>
		</UISelect>
	);
}
