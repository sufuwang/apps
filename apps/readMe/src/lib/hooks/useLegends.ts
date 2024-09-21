import { useEffect, useState } from "react";

interface Props {
	id: "Expenditure" | "Assets" | "Earning";
	Legends: string[];
}

type Legends = { label: string; show: boolean }[];
type OnChange = ReturnType<typeof useLegends>["onChange"];
export type { Legends, OnChange };

export default function useLegends({ id, Legends: _Legends }: Props) {
	const Legends = _Legends.concat("Amount");
	const CacheKey = `${id}-legends`;
	const [legends, setLegends] = useState(
		Legends.map((key) => ({ label: key, show: true }))
	);

	useEffect(() => {
		const _l = localStorage.getItem(CacheKey);
		if (_l) {
			let legends = Legends.map((label: string) => ({ label, show: true }));
			try {
				legends
					.filter((legend) => !JSON.parse(_l).includes(legend.label))
					.forEach((legend) => {
						legend.show = false;
					});
			} catch {
			} finally {
				setLegends(legends);
			}
		}
	}, []);

	function onChange(key: boolean): void;
	function onChange(key: string, show: boolean): void;
	function onChange(key: string, show?: boolean): Error;
	function onChange(key: string | boolean, show?: boolean): void | Error {
		if (key === true || key === false) {
			localStorage.setItem(CacheKey, JSON.stringify(key ? Legends : []));
			setLegends(Legends.map((legend) => ({ label: legend, show: key })));
			return;
		} else if (show === undefined) {
			throw "Please input `Show` argument for onChange function";
		}
		const items = legends.map((legend) => ({
			...legend,
			show: legend.label === key ? show : legend.show,
		}));
		localStorage.setItem(
			CacheKey,
			JSON.stringify(
				items.filter((item) => item.show).map((item) => item.label)
			)
		);
		setLegends(items);
	}

	return {
		legends,
		onChange,
	};
}
