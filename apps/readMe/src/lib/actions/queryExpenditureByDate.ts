"use server";
import Mysql from "@db/mysql";

export default async function QueryExpenditureByDate(date: string) {
	return JSON.stringify(await Mysql.getExpenditureByDate(date));
}
