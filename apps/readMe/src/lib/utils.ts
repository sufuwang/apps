import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * 格式化金额
 */
export function formatAmount(
	num: number,
	type: "zh" | "en",
	{
		noCurrency,
		prefix,
	}: { noCurrency?: boolean; prefix?: string | JSX.Element } = {}
): string {
	const r = {
		zh: {
			local: "zh-hans",
			currency: "CNY",
		},
		en: {
			local: "en",
			currency: "USD",
		},
	}[type];

	if (prefix) {
		return `${prefix} ${new Intl.NumberFormat(r.local).format(num)}`;
	}
	if (noCurrency) {
		return new Intl.NumberFormat(r.local).format(num);
	}

	return new Intl.NumberFormat(r.local, {
		style: "currency",
		currency: r.currency,
	}).format(num);
}

/**
 * 滚动至锚点
 */
export function scrollById(id: string) {
	document.getElementById(id)?.scrollIntoView(false);
}

/**
 * 转换首字符的大小写
 */
export function convertFirstWord(str: string, type: "upper" | "lower"): string {
	const c = (
		{
			upper: "toUpperCase",
			lower: "toLowerCase",
		} as const
	)[type];
	return str.slice(0, 1)[c]() + str.slice(1);
}

/**
 * 对象转字符串
 */
export function queryToString(
	query: Record<string, string | Array<string>> = {}
): string {
	return Object.entries(query)
		.map(([key, value]) => {
			if (Array.isArray(value)) {
				return value.map((v) => `${key}=${v}`).join("&");
			}
			return `${key}=${value}`;
		})
		.join("&");
}

/**
 * YYYY-M / YYYY-MM => YYYY-MM-DD
 */
export function formatMonth(date: string) {
	return dayjs(date, "YYYY-MM").format("YYYY-MM-DD");
}

/**
 * YYYY-MM => YYYY-MM-DD HH:mm:ss
 */
export function monthToFullDate(date: string) {
	return dayjs(date, "YYYY-MM").format("YYYY-MM-DD HH:mm:ss");
}

/**
 * YYYY-MM-DD HH:mm:ss => YYYY-MMMM / YYYY-MMM
 */
export function fullDateToMonth(date: string, fullMonth?: boolean) {
	return dayjs(date, "YYYY-MM-DD HH:mm:ss").format(
		fullMonth ? "YYYY-MMMM" : "YYYY-MMM"
	);
}

export function getRowAmount(item: Economics.DB<Object>) {
	return (
		Math.round(
			Object.entries(item)
				.filter(([item]) => !["Date", "ID", "LoanBalance"].includes(item))
				.map(([, value]) => value)
				.reduce((a, b) => a + b) * 100
		) / 100
	);
}
