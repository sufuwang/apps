import ServerlessMysql, {
	type ServerlessMysql as SMysql,
} from "serverless-mysql";
import { formatMonth } from "@lib/utils";

const Tables = {
	Assets: "Assets",
	Earning: "Earning",
	Expenditure: "Expenditure",
} as const;

const connect: FunctionDecoration<Mysql> = (t, k) => {
	if (Mysql.handle) {
		return;
	}
	Mysql.handle = ServerlessMysql({
		config: {
			host: process.env.MYSQL_HOST,
			port: parseInt(process.env.MYSQL_PORT || "3306"),
			database: "read_me",
			user: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			timezone: "zh",
		},
	});
};

interface Options {
	orderBy?: [string, "ASC" | "DESC"];
}

const setOptionsForSql = (sql: string, { orderBy }: Options) => {
	if (orderBy) {
		const [fieldName, value] = orderBy;
		sql += ` ORDER BY ${fieldName} ${value}`;
	}
	return sql;
};

export default class Mysql {
	static handle: SMysql;

	@connect
	static async query(sql: string, options?: Options) {
		const results = await Mysql.handle.query(
			options ? setOptionsForSql(sql, options) : sql
		);
		await Mysql.handle.end();
		return results;
	}

	/**
	 * Assets Table
	 */
	// 获取所有 Assets 数据
	static getAllAssets({ sort }: { sort: "asc" | "desc" } = { sort: "desc" }) {
		return Mysql.query(`SELECT * FROM ${Tables.Assets}`, {
			orderBy: ["Date", sort.toUpperCase()] as Options["orderBy"],
		});
	}
	// 根据 Date 索引 Assets 数据
	static async getAssetsByDate(date: string) {
		const [assets] = (await Mysql.query(
			`SELECT * FROM ${Tables.Assets} WHERE Date = '${formatMonth(date)}'`
		)) as Economics.DB<Economics.Assets>[];
		return assets || {};
	}
	// 根据 Date 区间索引 Assets 数据
	static async getAssetsByDateRange(range: [string, string]) {
		const [startDate, endDate] = range.map(formatMonth);
		return Mysql.query(
			`SELECT * FROM ${Tables.Assets} WHERE Date BETWEEN '${startDate}' AND '${endDate}'`,
			{ orderBy: ["Date", "DESC"] }
		);
	}
	// 修改 & 新增一条 Assets 数据
	static async createAssets(assets: Economics.Combine<Economics.Assets>) {
		const Date = formatMonth(assets.Date);
		const { ID } = await Mysql.getAssetsByDate(Date);
		if (ID > -1) {
			return Mysql.query(
				`UPDATE ${Tables.Assets} SET` +
					" `Date` = " +
					`'${Date}'` +
					", `RMB` = " +
					assets.RMB +
					", `HongKong Dollar` = " +
					assets["HongKong Dollar"] +
					", `Stock(HK)` = " +
					assets["Stock(HK)"] +
					", `Description` = " +
					(`'${assets.Description}'` ?? "") +
					` WHERE ID = ${ID}`
			);
		}
		return Mysql.query(
			`INSERT INTO ${Tables.Assets} (` +
				"`Date`, `RMB`, `HongKong Dollar`, `Stock(HK)`, `Description`" +
				`) VALUES ('${Date}',${assets.RMB},${assets["HongKong Dollar"]},${assets["Stock(HK)"]},'${assets["Description"]}')`
		);
	}

	/**
	 * Earning Table
	 */
	// 获取所有 Earning 数据
	static getAllEarning({ sort }: { sort: "asc" | "desc" } = { sort: "desc" }) {
		return Mysql.query(`SELECT * FROM ${Tables.Earning}`, {
			orderBy: ["Date", sort.toUpperCase()] as Options["orderBy"],
		});
	}
	// 根据 Date 索引 Earning 数据
	static async getEarningByDate(date: string) {
		const [earning] = (await Mysql.query(
			`SELECT * FROM ${Tables.Earning} WHERE Date = '${formatMonth(date)}'`
		)) as Economics.DB<Economics.Earning>[];
		return earning || {};
	}
	// 根据 Date 区间索引 Earning 数据
	static async getEarningByDateRange(range: [string, string]) {
		const [startDate, endDate] = range.map(formatMonth);
		return Mysql.query(
			`SELECT * FROM ${Tables.Earning} WHERE Date BETWEEN '${startDate}' AND '${endDate}'`,
			{ orderBy: ["Date", "DESC"] }
		);
	}
	// 修改 & 新增一条 Earning 数据
	static async createEarning(earning: Economics.Combine<Economics.Earning>) {
		const Date = formatMonth(earning.Date);
		const { ID } = await Mysql.getEarningByDate(Date);
		if (ID > -1) {
			return Mysql.query(
				`UPDATE ${Tables.Earning} SET` +
					" `Date` = " +
					`'${Date}'` +
					", `BaseWage` = " +
					earning.BaseWage +
					", `PartTimeIncome` = " +
					earning.PartTimeIncome +
					", `InvestmentIncome` = " +
					earning.InvestmentIncome +
					", `OtherIncome` = " +
					earning.OtherIncome +
					", `Description` = " +
					(`'${earning.Description}'` ?? "") +
					` WHERE ID = ${ID}`
			);
		}
		return Mysql.query(
			`INSERT INTO ${Tables.Earning} (` +
				"`Date`, `BaseWage`, `PartTimeIncome`, `InvestmentIncome`, `OtherIncome`, `Description`" +
				`) VALUES ('${Date}',${earning.BaseWage},${earning.PartTimeIncome},${earning.InvestmentIncome},${earning.OtherIncome},${earning.Description})`
		);
	}

	/**
	 * Expenditure Table
	 */
	// 获取所有 Expenditure 数据
	static getAllExpenditure(
		{ sort }: { sort: "asc" | "desc" } = { sort: "desc" }
	) {
		return Mysql.query(`SELECT * FROM ${Tables.Expenditure}`, {
			orderBy: ["Date", sort.toUpperCase()] as Options["orderBy"],
		});
	}
	// 根据 Date 索引 Expenditure 数据
	static async getExpenditureByDate(date: string) {
		const [expenditure] = (await Mysql.query(
			`SELECT * FROM ${Tables.Expenditure} WHERE Date = '${formatMonth(date)}'`
		)) as Economics.DB<Economics.Expenditure & Economics.Loan>[];
		return expenditure || {};
	}
	// 根据 Date 区间索引 Expenditure 数据
	static async getExpenditureByDateRange(range: [string, string]) {
		const [startDate, endDate] = range.map(formatMonth);
		return Mysql.query(
			`SELECT * FROM ${Tables.Expenditure} WHERE Date BETWEEN '${startDate}' AND '${endDate}'`,
			{ orderBy: ["Date", "DESC"] }
		);
	}
	// 修改 & 新增一条 Expenditure 数据
	static async createExpenditure(
		expenditure: Economics.Combine<Economics.Expenditure & Economics.Loan>
	) {
		const Date = formatMonth(expenditure.Date);
		const { ID } = await Mysql.getExpenditureByDate(Date);
		if (ID > -1) {
			return Mysql.query(
				`UPDATE ${Tables.Expenditure} SET` +
					" `Date` = " +
					`'${Date}'` +
					", `Clothes` = " +
					expenditure.Clothes +
					", `Communication` = " +
					expenditure.Communication +
					", `Elder` = " +
					expenditure.Elder +
					", `Food` = " +
					expenditure.Food +
					", `Health` = " +
					expenditure.Health +
					", `House` = " +
					expenditure.House +
					", `Others` = " +
					expenditure.Others +
					", `Sociality` = " +
					expenditure.Sociality +
					", `Transportation` = " +
					expenditure.Transportation +
					", `MonthlyLoanPayment` = " +
					expenditure.MonthlyLoanPayment +
					", `EarlyLoanPayment` = " +
					expenditure.EarlyLoanPayment +
					", `LoanBalance` = " +
					expenditure.LoanBalance +
					", `Description` = " +
					(`'${expenditure.Description}'` ?? "") +
					` WHERE ID = ${ID}`
			);
		}
		return Mysql.query(
			`INSERT INTO ${Tables.Expenditure} (` +
				"`Date`, `Clothes`, `Communication`, `Elder`, `Food`, `Health`, `House`, `Others`, `Sociality`, `Transportation`, `MonthlyLoanPayment`, `EarlyLoanPayment`, `LoanBalance`, `Description`" +
				`) VALUES ('${Date}',${expenditure.Clothes},${expenditure.Communication},${expenditure.Elder},${expenditure.Food},${expenditure.Health},${expenditure.House},${expenditure.Others},${expenditure.Sociality},${expenditure.Transportation},${expenditure.MonthlyLoanPayment},${expenditure.EarlyLoanPayment},${expenditure.LoanBalance},${expenditure.Description})`
		);
	}
}
