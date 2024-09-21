"use server";
import Mysql from "@db/mysql";

export default async function AddExpenditure(
	data: WithUpperDate<Economics.Expenditure & Economics.Loan, string>
) {
	await Mysql.createExpenditure(data);
	return Promise.resolve();
}
