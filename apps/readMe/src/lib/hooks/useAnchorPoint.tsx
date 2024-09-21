import { scrollById } from "@lib/utils";
import { useEffect } from "react";

export const renderAnchorPoint = (id: string | React.ReactNode) => {
	if (typeof id !== "string") {
		Promise.reject("[renderAnchorPoint] Id must be a string");
		return id;
	}
	return (
		<a
			className="no-underline focus-visible:outline-0 hover:underline"
			id={id}
			href={`#${id}`}
			onClick={() => {
				scrollById(id);
			}}
		>
			{id}
		</a>
	);
};

export default function useAnchorPoint() {
	useEffect(() => {
		scrollById(window.location.hash.replace(/^#/, ""));
	}, []);

	return {
		renderAnchorPoint,
	};
}
