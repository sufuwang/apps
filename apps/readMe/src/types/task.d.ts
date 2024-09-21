interface Item {
	detail: string;
	status: Status;
}

declare namespace Task {
	/**
	 * 	plan
	 *   |-- closed
	 *   |-- todo -> doing -> done
	 */
	type Status =
		| "plan" // 计划中的任务
		| "closed" //被驳回的任务
		| "todo" //待执行的任务
		| "doing" // 正在进行的任务
		| "done"; // 已经完成的任务

	interface PlanItem extends Item {
		status: "plan";
	}
	interface ClosedItem extends Item {
		reason: string;
		status: "closed";
	}
	interface TodoItem extends PlanItem {
		status: "todo";
		planStartDate: string;
		planEndDate: string;
		priority: 1 | 2 | 3 | 4 | 5;
	}
	interface DoingItem extends TodoItem {
		status: "doing";
		startDate: string;
	}
	interface DoneItem extends DoingItem {
		status: "done";
		endDate: string;
		isDelay: boolean;
	}
}
