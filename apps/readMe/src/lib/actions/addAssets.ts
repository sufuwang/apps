"use server";
import Mysql from "@db/mysql";

export default async function AddAssets(
	data: WithUpperDate<Economics.Assets, string>
) {
	await Mysql.createAssets(data);
	return Promise.resolve();
}
