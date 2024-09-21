"use server";
import Mysql from "@db/mysql";

export default async function QueryEarningByDate(date: string) {
	return JSON.stringify(await Mysql.getEarningByDate(date));
}
