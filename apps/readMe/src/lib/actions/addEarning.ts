"use server";
import Mysql from "@db/mysql";

export default async function AddEarning(
	data: WithUpperDate<Economics.Earning, string>
) {
	await Mysql.createEarning(data);
	return Promise.resolve();
}
