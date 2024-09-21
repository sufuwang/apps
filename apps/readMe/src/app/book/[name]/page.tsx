import Markdown from "@comps/markdown";

export default function Book({ params }: { params: { name: string } }) {
	return (
		<div className="w-full flex justify-center">
			<Markdown path={`book/${params.name}`} />
		</div>
	);
}
