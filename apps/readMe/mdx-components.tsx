import type { MDXComponents } from "mdx/types";
import { renderAnchorPoint } from "@hooks/useAnchorPoint";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="font-heading mt-16 scroll-m-20 border-t pt-12 text-2xl font-semibold tracking-tight first:mt-0 first:border-none">
				{renderAnchorPoint(children)}
			</h1>
		),
		h2: ({ children }) => <h2>{renderAnchorPoint(children)}</h2>,
		h3: ({ children }) => <h3>{renderAnchorPoint(children)}</h3>,
		blockquote: ({ children }) => (
			<blockquote className="bg-red">{children}</blockquote>
		),
		...components,
	};
}
