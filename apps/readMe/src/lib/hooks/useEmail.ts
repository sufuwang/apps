import type Mail from "nodemailer/lib/mailer";
import { useState } from "react";

export default function useEmail() {
	const [loading, setLoading] = useState(false);

	const send = async (body: Mail.Options): Promise<Response> => {
		setLoading(true);
		try {
			const info = await fetch("/api/email", {
				method: "POST",
				body: JSON.stringify(body),
			});
			return info;
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		send,
	};
}
