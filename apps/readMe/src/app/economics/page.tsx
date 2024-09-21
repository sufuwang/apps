import Earning from "./_comps/Earning";
import Expenditure from "./_comps/Expenditure";
import Assets from "./_comps/Assets";

export default function Economics() {
	return (
		<div className="flex flex-col gap-2 m-2">
			<Assets />
			<Earning />
			<Expenditure />
		</div>
	);
}
