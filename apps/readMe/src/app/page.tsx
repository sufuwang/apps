import DashBoard from "@comps/dashBoard";
import Welcome from "@comps/welcome";

export default function Home() {
	return (
		<div className="flex flex-col">
			<Welcome />
			<DashBoard />
		</div>
	);
}

export const metadata = {
	title: "Home",
};
