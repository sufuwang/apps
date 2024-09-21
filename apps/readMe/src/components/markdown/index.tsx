"use client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import useAnchorPoint from "@hooks/useAnchorPoint";

interface Props {
	path: string;
}

export default function Markdown(props: Props) {
	useAnchorPoint();

	const Content = dynamic(
		() => import(`../../mdx/${props.path}.mdx`).catch(() => notFound()),
		{ ssr: true }
	);

	return (
		<article className="w-full prose prose-stone prose-vercel pt-12 pb-36">
			<Content />
		</article>
	);
}
