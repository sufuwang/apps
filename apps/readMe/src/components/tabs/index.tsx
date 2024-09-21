import {
	Tabs as UITabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@comps/ui/tabs";

export interface Props {
	defaultValue?: string;
	data: Array<{ label: string; value: string; children: JSX.Element }>;
}

const renderTabsList = (data: Props["data"]) => {
	return data.map((item) => (
		<TabsTrigger key={item.value} value={item.value}>
			{item.label}
		</TabsTrigger>
	));
};
const renderTabsContent = (data: Props["data"]) => {
	return data.map((item) => (
		<TabsContent key={item.value} value={item.value} className="flex-auto">
			{item.children}
		</TabsContent>
	));
};

export default function Tabs({ defaultValue, data }: Props) {
	if (data.length === 0) {
		return null;
	}
	return (
		<UITabs
			defaultValue={defaultValue || data[0].value}
			className="h-[100%] flex flex-col"
		>
			<TabsList className="mb-2 w-fit">{renderTabsList(data)}</TabsList>
			{renderTabsContent(data)}
		</UITabs>
	);
}
