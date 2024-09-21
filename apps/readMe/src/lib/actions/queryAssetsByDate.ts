"use server";
import Mysql from "@db/mysql";

export default async function QueryAssetsByDate(date: string) {
	return JSON.stringify(await Mysql.getAssetsByDate(date));
}
