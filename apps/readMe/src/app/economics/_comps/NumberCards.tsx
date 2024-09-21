import NumberCard, { Props as NumberCardProps } from "@comps/cards/number";

interface Props {
	data: Array<Array<NumberCardProps>>;
}

export default function NumberCards({ data }: Props) {
	const cols = Math.max(...data.map((row) => row.length));
	const renderRows = (row: Array<NumberCardProps>, rowIndex: number) => {
		return (
			<div className={`grid gap-4 grid-cols-${cols}`}>
				{row.map((item, itemIndex) => (
					<NumberCard key={`${rowIndex}-${itemIndex}`} {...item} />
				))}
			</div>
		);
	};

	return (
		<div className={`my-4 grid gap-4 grid-rows-${data.length}`}>
			{data.map(renderRows)}
		</div>
	);
}
