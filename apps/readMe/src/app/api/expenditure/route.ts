import Mysql from "@db/mysql";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");

	if (startDate && endDate) {
		return Response.json({
			data: await Mysql.getExpenditureByDateRange([startDate, endDate]),
		});
	}

	return Response.json({ data: await Mysql.getAllExpenditure() });
}
