import { useEffect, useState } from "react";
import { queryToString } from "@lib/utils";

interface UseGetFetchParameters<D, T> {
	defaultData: D;
	url: string;
	query?: T;
}
export default function useGetFetch<
	T = Record<string, string | string[]>,
	D = any
>({ defaultData, url, query: _query = {} as T }: UseGetFetchParameters<D, T>) {
	const [data, setData] = useState<D>(defaultData);
	const [loading, setLoading] = useState(true);

	async function getData(query: T = _query) {
		setLoading(true);
		try {
			const { data } = await (
				await fetch(`${url}?${queryToString(query!)}`)
			).json();
			setData(data);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return {
		data,
		loading,
		update: getData,
	};
}
