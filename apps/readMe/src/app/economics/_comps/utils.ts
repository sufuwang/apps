import dayjs from "dayjs";
import type { OnValueChange, Props } from "@comps/datePicker";

/**
 * 以月为维度，计算波动水平。
 * 值的绝对值越大，波动越大，当值为负数时，表示当月为负增长
 */
export const VolatilityByMonth = ({
	curMonth,
	preMonth,
	earlyMonth,
}: {
	curMonth: number;
	preMonth: number;
	earlyMonth: number;
}) => {
	if (preMonth - earlyMonth === 0) {
		return "-";
	}
	return ((curMonth - preMonth) / (preMonth - earlyMonth)).toFixed(3);
};

/**
 * 以年为维度，计算波动水平。
 * 值越大，波动越大，当值为负数时，表示当年为负增长
 */
export const HelperVolatilityByMonth = <T>(
	data: Economics.DB<T>[],
	_keys: keyof T | Array<keyof T>
) => {
	const keys = Array.isArray(_keys) ? _keys : [_keys];
	return {
		title: `Month Volatility Of ${
			Array.isArray(_keys) ? "Amount" : (_keys as string)
		}`,
		children: VolatilityByMonth({
			curMonth: keys.reduce(
				(value, key) => value + +(data[0][key] as string),
				0
			),
			preMonth: keys.reduce(
				(value, key) => value + +(data[1][key] as string),
				0
			),
			earlyMonth: keys.reduce(
				(value, key) => value + +(data[2][key] as string),
				0
			),
		}),
		desc: `Previous Value is ${VolatilityByMonth({
			curMonth: keys.reduce(
				(value, key) => value + +(data[1][key] as string),
				0
			),
			preMonth: keys.reduce(
				(value, key) => value + +(data[2][key] as string),
				0
			),
			earlyMonth: keys.reduce(
				(value, key) => value + +(data[3][key] as string),
				0
			),
		})}`,
	};
};

export const VolatilityByYear = ({
	curYear,
	preYear,
}: {
	curYear: number[];
	preYear: number[];
}) => {
	const a = curYear.reduce((a, b) => a + b) / curYear.length;
	const b = preYear.reduce((a, b) => a + b) / preYear.length;
	return (a / b).toFixed(3).toString();
};

export const HelperVolatilityByYear = <T>(
	data: Economics.DB<T>[],
	_keys: keyof T | Array<keyof T>
) => {
	const keys = Array.isArray(_keys) ? _keys : [_keys];
	const curYear = data.filter((item) =>
		item.Date.startsWith(dayjs().year().toString())
	);
	const [_, ...curYearWithoutLastMonth] = curYear.sort(
		(a, b) =>
			+(/-(.+)-/.exec(b.Date) || [])[1] - +(/-(.+)-/.exec(a.Date) || [])[1]
	);
	const preYear = data.filter((item) =>
		item.Date.startsWith((dayjs().year() - 1).toString())
	);

	return {
		title: `Year Volatility Of ${
			Array.isArray(_keys) ? "Amount" : (_keys as string)
		}`,
		children: VolatilityByYear({
			curYear: curYear.map((item) =>
				keys.reduce((value, key) => value + +item[key], 0)
			),
			preYear: preYear.map((item) =>
				keys.reduce((value, key) => value + +item[key], 0)
			),
		}),
		desc: `Previous Value is ${VolatilityByYear({
			curYear: curYearWithoutLastMonth.map((item) =>
				keys.reduce((value, key) => value + +item[key], 0)
			),
			preYear: preYear.map((item) =>
				keys.reduce((value, key) => value + +item[key], 0)
			),
		})}`,
	};
};

export const DefaultDatePicker: Required<
	Exclude<Props["defaultDate"], undefined>
> = {
	from: `${new Date().getFullYear() - 10}-1`,
	to: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
};

export const onDatePickerChange: (update: Function) => OnValueChange =
	(update) =>
	({ from, to }) => {
		const startDate = from.join("-");
		const endDate = to.join("-");
		if (!startDate || !endDate) {
			return update();
		}
		update({
			startDate,
			endDate,
		});
	};
