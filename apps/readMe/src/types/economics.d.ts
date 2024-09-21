declare namespace Economics {
	type DB<T> = Combine<T & { ID: number }>;
	type Combine<T> = T & { Date: string };

	/**
	 * @param monthlyPayment 月供
	 * @param earlyPayment 提前还款金额
	 * @param balance 贷款余额
	 */
	declare interface Loan {
		MonthlyLoanPayment: number;
		EarlyLoanPayment: number;
		LoanBalance: number;
		Description: string;
	}

	/**
	 * @param Food 吃
	 * @param Clothes 穿
	 * @param House 住
	 * @param Transportation 行
	 * @param Communication 通讯
	 * @param Health 生病
	 * @param Elder 先辈
	 * @param Sociality 人情往来
	 * @param Others 其他
	 */
	declare interface Expenditure {
		Food: number;
		Clothes: number;
		House: number;
		Transportation: number;
		Communication: number;
		Health: number;
		Elder: number;
		Sociality: number;
		Others: number;
	}

	/**
	 * @param baseWage 基本工资
	 * @param partTimeIncome 兼职收入
	 * @param investmentIncome 投资收入
	 * @param otherIncome 其他收入
	 */
	declare interface Earning<T = { value: number }> {
		BaseWage: T & { company: string };
		PartTimeIncome: T & { detail: string };
		InvestmentIncome: T & { detail: "fund" | "stock" };
		OtherIncome: T & { detail: string };
		Description: string;
	}

	declare interface Assets {
		RMB: string;
		"HongKong Dollar": string;
		"Stock(HK)": string;
		Description?: string;
	}
}
